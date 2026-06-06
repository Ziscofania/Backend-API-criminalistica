import 'dotenv/config'

const config = {
  // Path to your schema
  schemaPath: './prisma/schema.prisma',
  // Provide datasources here instead of `url` in the schema (Prisma v7+)
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
}

export default config
