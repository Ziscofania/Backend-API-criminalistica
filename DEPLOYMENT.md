# Guía de Despliegue en Render

## 🚀 Despliegue Rápido

### Paso 1: Conectar Repositorio a Render

1. Ve a [render.com](https://render.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New +" → "Web Service"
4. Selecciona "Connect a repository"
5. Autoriza a Render acceder a tu GitHub
6. Busca y selecciona `Backend-API-criminalistica`

### Paso 2: Configurar el Servicio Web

- **Name**: `criminalistica-api`
- **Environment**: `Node`
- **Region**: `Ohio` (u otra cercana)
- **Branch**: `main`
- **Build Command**: `npm install && npm run prisma:generate && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free` (o upgrade según necesidad)

### Paso 3: Crear Base de Datos PostgreSQL

1. En la sección "Services" del dashboard
2. Haz clic en "New +" → "PostgreSQL"
3. Configura:
   - **Name**: `criminalistica-db`
   - **Region**: `Ohio` (misma región que el API)
   - **PostgreSQL Version**: `15`
   - **Plan**: `Free`

### Paso 4: Conectar Base de Datos al API

1. En el servicio `criminalistica-api`, ve a la pestaña "Environment"
2. Crea una variable de entorno `DATABASE_URL`
3. En el valor, usa: `${{ database.DATABASE_URL }}` o cópiala desde los detalles de la BD
4. Agrega otras variables si es necesario:
   ```
   NODE_ENV=production
   PORT=3000
   CORS_ORIGIN=https://tu-dominio.com
   ```

### Paso 5: Ejecutar Migraciones

After the first deployment:

1. Ve al Shell del servicio web en Render
2. Ejecuta:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

## 📊 Acceder a tu API

- **API Base URL**: `https://criminalistica-api.onrender.com` (será asignada por Render)
- **Swagger UI**: `https://criminalistica-api.onrender.com/swagger`
- **OpenAPI JSON**: `https://criminalistica-api.onrender.com/openapi.json`
- **Static Swagger UI**: `https://criminalistica-api.onrender.com/swagger-ui.html`

## 📚 Swagger Documentation Online

### Opción 1: Desde tu aplicación (Recomendado)
```
https://criminalistica-api.onrender.com/swagger
```

### Opción 2: Usar Swagger Editor Online
1. Ve a [editor.swagger.io](https://editor.swagger.io)
2. File → Import URL
3. Pega: `https://criminalistica-api.onrender.com/openapi.json`

### Opción 3: Usar GitHub Pages para Documentación Estática
1. El archivo `openapi.json` se genera automáticamente en `public/`
2. Activa GitHub Pages en tu repositorio
3. La documentación estará disponible en `https://ziscofania.github.io/Backend-API-criminalistica/swagger-ui.html`

## 🔧 Variables de Entorno

Configura estas en Render si es necesario:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/database
CORS_ORIGIN=https://tu-dominio.com
```

## 🛡️ Recomendaciones de Seguridad

1. **Never commit `.env` to the repository**
2. Use environment variables for sensitive data
3. Enable auto-deploy only from `main` branch
4. Set up branch protection rules in GitHub
5. Keep dependencies updated
6. Monitor application logs regularly

## 🐛 Troubleshooting

### "Build failed"
- Check the build logs in Render dashboard
- Verify Node version compatibility
- Ensure all environment variables are set

### "Database connection error"
- Verify `DATABASE_URL` is correctly set
- Check database is in same region or accessible
- Run migrations manually if needed

### "Swagger not loading"
- Ensure CORS is configured correctly
- Check `openapi.json` is generated in `public/` folder
- Verify API is running with `npm run start:prod`

## 📞 Soporte

- [Render Documentation](https://render.com/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs/)
