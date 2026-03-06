# ✅ Pasos Siguientes - Guía Rápida

## 🎯 Lo que ya está hecho

✅ Proyecto Next.js inicializado con TypeScript
✅ Dependencias instaladas (Airtable, Algolia)
✅ Endpoint `/api/sync` creado y funcional
✅ Endpoint `/api/products` creado con búsqueda y paginación
✅ Configuración para Vercel lista
✅ Documentación completa en español

## 📋 Lo que DEBES hacer ahora

### 1. Configurar Airtable (15 minutos)

**Pasos:**
1. Ve a https://airtable.com y crea una cuenta (si no tienes)
2. Crea una nueva base llamada **"Productos"**
3. Crea una tabla con estos campos exactos:
   - `Name` (Single line text)
   - `Description` (Long text)
   - `Price` (Number - formato decimal)
   - `Image` (Attachment)
   - `Category` (Single select - opciones: Electrónica, Ropa, Hogar, etc.)
   - `Stock` (Number)
   - `SKU` (Single line text)

4. Agrega al menos 5-10 productos de ejemplo

5. Obtén tus credenciales:
   - Ve a https://airtable.com/account → Genera un **Personal Access Token**
   - Ve a https://airtable.com/api → Selecciona tu base → Copia el **Base ID** (empieza con "app...")
   - Anota el nombre de tu tabla (generalmente "Productos" o "Table 1")

### 2. Configurar Algolia (10 minutos)

**Pasos:**
1. Ve a https://www.algolia.com y crea una cuenta gratuita
2. Crea una nueva aplicación
3. Ve a **Settings** → **API Keys**
4. Copia:
   - **Application ID**
   - **Admin API Key** (¡NO la Search-Only API Key!)
5. Ve a **Indices** → **Create Index** → Nombre: `productos`

### 3. Actualizar el archivo .env.local (2 minutos)

Abre el archivo `.env.local` que ya existe en la raíz del proyecto y reemplaza los valores:

```env
# Airtable
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Productos

# Algolia
ALGOLIA_APP_ID=XXXXXXXXXX
ALGOLIA_ADMIN_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_INDEX_NAME=productos
```

### 4. Probar localmente (5 minutos)

**En Git Bash, ejecuta:**

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

Espera a que aparezca: `✓ Ready in X ms`

**En otra ventana de Git Bash, prueba los endpoints:**

```bash
# 1. Sincronizar productos de Airtable a Algolia
curl http://localhost:3000/api/sync

# Deberías ver:
# {"success":true,"message":"Productos sincronizados exitosamente","count":X}

# 2. Buscar productos
curl "http://localhost:3000/api/products?q=&limit=5&offset=0"

# Deberías ver tus productos en formato JSON
```

Si ves errores, verifica:
- ✅ Las variables de entorno están correctas
- ✅ El servidor está corriendo (`npm run dev`)
- ✅ Tienes productos en Airtable
- ✅ El índice de Algolia existe

### 5. Subir a GitHub (5 minutos)

**En Git Bash:**

```bash
# Inicializar git (si no lo hiciste)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - API de búsqueda de productos"

# Crear repositorio en GitHub (ve a github.com y crea un nuevo repo)
# Luego conecta tu repo local:
git remote add origin https://github.com/TU_USUARIO/buscador-de-productos.git
git branch -M main
git push -u origin main
```

### 6. Deployar en Vercel (10 minutos)

**Opción A - Interfaz Web (Recomendado):**

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en **"Add New..."** → **"Project"**
4. Selecciona tu repositorio `buscador-de-productos`
5. Click en **"Import"**
6. En **"Environment Variables"**, agrega las 6 variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_ADMIN_API_KEY`
   - `ALGOLIA_INDEX_NAME`
7. Click en **"Deploy"**
8. Espera 2-3 minutos
9. ¡Listo! Copia tu URL: `https://tu-proyecto.vercel.app`

**Opción B - Terminal:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 7. Probar en producción (2 minutos)

```bash
# Reemplaza con tu URL de Vercel
curl https://tu-proyecto.vercel.app/api/sync
curl "https://tu-proyecto.vercel.app/api/products?q=laptop&limit=5"
```

### 8. Configurar Cron Job (5 minutos)

1. Ve a https://cron-job.org/en/signup.php
2. Crea una cuenta
3. Click en **"Create cronjob"**
4. Configura:
   - **Title:** Sincronizar Productos
   - **URL:** `https://tu-proyecto.vercel.app/api/sync`
   - **Schedule:** Cada hora (o lo que prefieras)
5. Click en **"Create cronjob"**
6. Prueba con **"Run now"**

## 🎉 ¡Completado!

Una vez que hagas todos estos pasos, tendrás:

✅ API funcionando en producción
✅ Sincronización automática cada hora
✅ Búsqueda de productos con paginación
✅ Todo deployado en Vercel

## 📚 Documentación de Referencia

- **README.md** - Documentación general del proyecto
- **INSTRUCCIONES_DEPLOYMENT.md** - Guía detallada de deployment
- **EJEMPLOS_USO.md** - Ejemplos de cómo usar la API

## 🆘 Si tienes problemas

### Error: "Cannot find module"
```bash
# Reinstala las dependencias
rm -rf node_modules
npm install
```

### Error: "Invalid API Key"
- Verifica que copiaste bien las credenciales
- Asegúrate de usar el **Admin API Key** de Algolia, no la Search-Only

### Error: "Index does not exist"
- Ve a Algolia y crea el índice llamado exactamente `productos`

### El cron no funciona
- Verifica que la URL sea correcta
- Prueba ejecutarlo manualmente en cron-job.org
- Verifica que el endpoint `/api/sync` funcione en tu navegador

## 📞 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Ver logs en Vercel
vercel logs

# Deployar a producción
vercel --prod
```

## ⏱️ Tiempo Total Estimado

- Configurar Airtable: 15 min
- Configurar Algolia: 10 min
- Actualizar .env.local: 2 min
- Probar localmente: 5 min
- Subir a GitHub: 5 min
- Deployar en Vercel: 10 min
- Configurar Cron Job: 5 min

**Total: ~50 minutos** ⏱️

¡Éxito! 🚀
