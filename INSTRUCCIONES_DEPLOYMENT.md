# 📦 Instrucciones de Deployment - Paso a Paso

## ✅ Checklist Pre-Deployment

Antes de deployar, asegúrate de tener:

- [ ] Cuenta de Airtable con tabla de productos configurada
- [ ] Cuenta de Algolia con índice creado
- [ ] Cuenta de GitHub (para conectar con Vercel)
- [ ] Cuenta de Vercel (gratis)
- [ ] Todas las credenciales anotadas

## 🔑 Credenciales Necesarias

### Airtable
1. **AIRTABLE_API_KEY**: Personal Access Token
   - Ve a: https://airtable.com/account
   - Clic en "Generate token"
   - Permisos necesarios: `data.records:read`
   
2. **AIRTABLE_BASE_ID**: ID de tu base
   - Ve a: https://airtable.com/api
   - Selecciona tu base
   - El ID aparece en la URL: `app...`
   
3. **AIRTABLE_TABLE_NAME**: Nombre de tu tabla
   - Generalmente: `Productos` o `Table 1`

### Algolia
1. **ALGOLIA_APP_ID**: Application ID
   - Dashboard → Settings → Applications → Application ID
   
2. **ALGOLIA_ADMIN_API_KEY**: Admin API Key
   - Dashboard → Settings → API Keys → Admin API Key
   
3. **ALGOLIA_INDEX_NAME**: Nombre del índice
   - Generalmente: `productos`

## 🚀 Pasos para Deployar en Vercel

### Opción A: Desde la interfaz web (Recomendado)

#### 1. Preparar el repositorio en GitHub

```bash
# En Git Bash, dentro de la carpeta del proyecto
git init
git add .
git commit -m "Initial commit - Buscador de productos"

# Crea un repositorio en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/buscador-de-productos.git
git branch -M main
git push -u origin main
```

#### 2. Conectar con Vercel

1. Ve a https://vercel.com
2. Haz clic en **"Sign Up"** o **"Login"**
3. Conecta tu cuenta de GitHub
4. Haz clic en **"Add New..."** → **"Project"**
5. Selecciona el repositorio `buscador-de-productos`
6. Haz clic en **"Import"**

#### 3. Configurar Variables de Entorno

En la pantalla de configuración del proyecto:

1. Expande **"Environment Variables"**
2. Agrega cada variable una por una:

```
Name: AIRTABLE_API_KEY
Value: [tu_token_de_airtable]
```

```
Name: AIRTABLE_BASE_ID
Value: [tu_base_id]
```

```
Name: AIRTABLE_TABLE_NAME
Value: Productos
```

```
Name: ALGOLIA_APP_ID
Value: [tu_app_id]
```

```
Name: ALGOLIA_ADMIN_API_KEY
Value: [tu_admin_key]
```

```
Name: ALGOLIA_INDEX_NAME
Value: productos
```

3. Haz clic en **"Deploy"**

#### 4. Esperar el Deployment

- Vercel construirá y deployará tu aplicación
- Esto toma aproximadamente 2-3 minutos
- Verás logs en tiempo real del proceso

#### 5. Verificar el Deployment

Una vez completado:

1. Vercel te mostrará la URL de tu aplicación: `https://tu-proyecto.vercel.app`
2. Copia esta URL
3. Prueba el endpoint de sincronización:

```bash
curl https://tu-proyecto.vercel.app/api/sync
```

4. Si todo está bien, deberías ver:
```json
{
  "success": true,
  "message": "Productos sincronizados exitosamente",
  "count": X
}
```

5. Prueba el endpoint de búsqueda:
```bash
curl "https://tu-proyecto.vercel.app/api/products?q=laptop&limit=5"
```

### Opción B: Desde la terminal con Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Iniciar sesión
vercel login

# Deployar (modo preview)
vercel

# Deployar a producción
vercel --prod
```

Durante el proceso, Vercel te preguntará:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta personal
- **Link to existing project?** → No
- **Project name?** → buscador-de-productos
- **Directory?** → ./
- **Override settings?** → No

Luego deberás agregar las variables de entorno manualmente en el dashboard de Vercel.

## ⏰ Configurar Cron Job

### 1. Crear cuenta en cron-job.org

1. Ve a https://cron-job.org/en/signup.php
2. Regístrate con tu email
3. Confirma tu cuenta

### 2. Crear el Cron Job

1. Haz clic en **"Cronjobs"** → **"Create cronjob"**
2. Configura:

**General:**
- **Title:** `Sincronizar Productos Airtable → Algolia`
- **Address:** `https://tu-proyecto.vercel.app/api/sync`

**Schedule:**
- **Enabled:** ✅
- **Every:** `1 hour` (o la frecuencia que prefieras)
- O usa expresión cron: `0 * * * *` (cada hora)

**Advanced:**
- **Request method:** GET
- **Request timeout:** 30 seconds

3. Haz clic en **"Create cronjob"**

### 3. Verificar que funciona

1. En cron-job.org, haz clic en tu cronjob
2. Haz clic en **"Run now"** para probarlo
3. Verifica en **"History"** que la ejecución fue exitosa (código 200)

## 🔍 Verificación Final

### Pruebas que debes hacer:

```bash
# 1. Sincronizar productos
curl https://tu-proyecto.vercel.app/api/sync

# 2. Buscar todos los productos
curl "https://tu-proyecto.vercel.app/api/products?limit=10&offset=0"

# 3. Buscar productos específicos
curl "https://tu-proyecto.vercel.app/api/products?q=laptop"

# 4. Probar paginación
curl "https://tu-proyecto.vercel.app/api/products?limit=5&offset=5"
```

### Respuestas esperadas:

✅ **Sincronización exitosa:**
```json
{
  "success": true,
  "message": "Productos sincronizados exitosamente",
  "count": 10
}
```

✅ **Búsqueda exitosa:**
```json
{
  "results": [...],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "total": 50
  }
}
```

❌ **Error común - Variables de entorno:**
```json
{
  "success": false,
  "message": "Error al sincronizar productos"
}
```
**Solución:** Verifica que todas las variables de entorno estén configuradas en Vercel.

## 🔄 Actualizar el Deployment

Cada vez que hagas cambios en el código:

```bash
# Commitea los cambios
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel automáticamente detectará el push y re-deployará
```

## 📊 Monitoreo

### En Vercel:
- **Dashboard:** Ver estadísticas de uso
- **Logs:** Ver logs de las funciones serverless
- **Analytics:** Métricas de rendimiento

### En Algolia:
- **Dashboard → Analytics:** Ver búsquedas realizadas
- **Dashboard → Indices:** Ver cantidad de registros

### En cron-job.org:
- **History:** Ver historial de ejecuciones del cron
- **Statistics:** Ver estadísticas de éxito/fallo

## 🆘 Solución de Problemas

### Error: "Cannot find module 'airtable'"
**Solución:** Verifica que `package.json` tenga las dependencias y que Vercel las instaló.

### Error: "Invalid API Key"
**Solución:** Verifica que las variables de entorno en Vercel sean correctas.

### Error: "Index does not exist"
**Solución:** Crea el índice en Algolia con el nombre exacto: `productos`

### El cron job no se ejecuta
**Solución:** 
1. Verifica que esté habilitado en cron-job.org
2. Prueba ejecutarlo manualmente con "Run now"
3. Verifica que la URL sea correcta

## 📞 Soporte

- **Vercel Docs:** https://vercel.com/docs
- **Algolia Docs:** https://www.algolia.com/doc/
- **Airtable API:** https://airtable.com/developers/web/api/introduction
- **Next.js Docs:** https://nextjs.org/docs
