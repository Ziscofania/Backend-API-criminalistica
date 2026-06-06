import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  [key: string]: any;
  private client: any;

  constructor() {
    // dynamic require to avoid TS issues before prisma generate
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let pkg: any;
    try {
      pkg = require('@prisma/client');
    } catch (e) {
      // Provide a clear message when the generated client is missing
      // Common fix: run `npx prisma generate` (or `npm run prisma:generate`)
      // or ensure postinstall ran in CI.
      // Re-throw with helpful message.
      // eslint-disable-next-line no-console
      console.error('\nPrisma client not found. Please run `npx prisma generate` and restart the server.\n');
      throw e;
    }
    const PrismaClient = pkg.PrismaClient || pkg.default || pkg;
    // Prisma v7 requires either an adapter (recommended for direct DB) or
    // an `accelerateUrl` (for Prisma Accelerate) when using an inline schema.
    // Prefer adapter for local Postgres. Fall back to `PRISMA_ACCELERATE_URL`.
    if (process.env.PRISMA_ACCELERATE_URL) {
      this.client = new PrismaClient({ accelerateUrl: process.env.PRISMA_ACCELERATE_URL });
    } else {
      // Try to load the official Postgres adapter package.
      let adapterFactory: any = undefined;
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const adapterPkg = require('@prisma/adapter-pg');
        adapterFactory = adapterPkg.PrismaPg || adapterPkg.default || adapterPkg;
      } catch (err) {
        console.error('\nMissing @prisma/adapter-pg. Install it or set PRISMA_ACCELERATE_URL.\n');
        throw err;
      }

      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error('DATABASE_URL is not set. Set DATABASE_URL or PRISMA_ACCELERATE_URL.');
      }

      const adapterInstance = new adapterFactory({ connectionString });
      this.client = new PrismaClient({ adapter: adapterInstance });
    }

    // proxy to forward property access to client (e.g., this.prisma.delito)
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) return (target as any)[prop];
        return target.client[prop as any];
      },
    });
  }

  async onModuleInit() {
    if (this.client && typeof this.client.$connect === 'function') await this.client.$connect();
  }

  async onModuleDestroy() {
    if (this.client && typeof this.client.$disconnect === 'function') await this.client.$disconnect();
  }
}
