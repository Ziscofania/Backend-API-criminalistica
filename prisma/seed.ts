// use dynamic require so build works even before prisma generate
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('@prisma/client');
const PrismaClient = pkg.PrismaClient || pkg.default || pkg;
const prisma = new PrismaClient();

async function main() {
  // Create tipos delito
  const tipos = [
    { nombre: 'Hurto' },
    { nombre: 'Robo' },
    { nombre: 'Homicidio' },
    { nombre: 'Fraude' },
    { nombre: 'Violencia' },
  ];

  for (const t of tipos) {
    await prisma.tipoDelito.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }

  // localidades
  const localidades = [] as any[];
  for (let i = 1; i <= 5; i++) {
    const loc = await prisma.localidad.upsert({ where: { id: i }, update: {}, create: { nombre: `Localidad ${i}` } });
    localidades.push(loc);
  }

  // barrios
  const barrios = [] as any[];
  for (let i = 1; i <= 10; i++) {
    const locId = ((i - 1) % 5) + 1;
    const b = await prisma.barrio.create({ data: { nombre: `Barrio ${i}`, localidadId: locId } });
    barrios.push(b);
  }

  // ubicaciones
  const ubicaciones = [] as any[];
  for (let i = 1; i <= 20; i++) {
    const locId = ((i - 1) % 5) + 1;
    const barrioId = ((i - 1) % 10) + 1;
    const u = await prisma.ubicacion.create({ data: { latitud: 10 + i * 0.01, longitud: 20 + i * 0.01, barrioId, localidadId: locId } });
    ubicaciones.push(u);
  }

  // usuarios
  for (let i = 1; i <= 10; i++) {
    await prisma.usuario.upsert({ where: { email: `user${i}@example.com` }, update: {}, create: { email: `user${i}@example.com`, name: `User ${i}`, role: i === 1 ? 'admin' : 'user' } });
  }

  // delitos
  const tiposAll = await prisma.tipoDelito.findMany();
  for (let i = 1; i <= 20; i++) {
    await prisma.delito.create({
      data: {
        nombre: `Delito ${i}`,
        descripcion: `Descripción delito ${i}`,
        fecha: new Date(Date.now() - i * 24 * 3600 * 1000),
        tipoDelitoId: tiposAll[(i - 1) % tiposAll.length].id,
        ubicacionId: ubicaciones[(i - 1) % ubicaciones.length].id,
        idEstado: (i % 3) + 1,
      },
    });
  }

  // settings
  await prisma.setting.upsert({ where: { key: 'site_name' }, update: {}, create: { key: 'site_name', value: 'API Criminalistica' } });

  // audit logs
  await prisma.auditLog.create({ data: { action: 'seed', resource: 'database' } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
