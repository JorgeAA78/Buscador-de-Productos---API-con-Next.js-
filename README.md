# 🔍 Buscador de Productos - API con Next.js

API de búsqueda de productos que sincroniza datos desde Airtable hacia Algolia y permite realizar búsquedas con paginación.

## 📋 Características

- ✅ Sincronización automática de productos desde Airtable a Algolia
- ✅ Búsqueda de productos con paginación
- ✅ API REST con Next.js
- ✅ Deployment en Vercel
- ✅ Sincronización programada con cron-jobs.org

## 🚀 Configuración Inicial

### 1. Configurar Airtable

1. Crea una base en Airtable llamada **"Productos"**
2. Crea una tabla con los siguientes campos:
   - **Name** (Single line text) - Nombre del producto
   - **Description** (Long text) - Descripción del producto
   - **Price** (Number) - Precio del producto
   - **Image** (Attachment) - Imagen del producto
   - **Category** (Single select) - Categoría del producto
   - **Stock** (Number) - Cantidad disponible
   - **SKU** (Single line text) - Código único del producto

3. Agrega productos de ejemplo a la tabla

4. Obtén tus credenciales:
   - Ve a https://airtable.com/account
   - Genera un **Personal Access Token**
   - Ve a https://airtable.com/api y obtén tu **Base ID** y **Table Name**

### 2. Configurar Algolia

1. Crea una cuenta en https://www.algolia.com/
2. Crea una nueva aplicación
3. Obtén tus credenciales:
   - **Application ID**
   - **Admin API Key**
4. Crea un índice llamado **"productos"**

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Airtable
AIRTABLE_API_KEY=tu_personal_access_token_aqui
AIRTABLE_BASE_ID=tu_base_id_aqui
AIRTABLE_TABLE_NAME=Productos

# Algolia
ALGOLIA_APP_ID=tu_algolia_app_id_aqui
ALGOLIA_ADMIN_API_KEY=tu_algolia_admin_key_aqui
ALGOLIA_INDEX_NAME=productos
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## 📡 Endpoints de la API

### `/api/sync` - Sincronizar productos

Sincroniza todos los productos de Airtable hacia Algolia.

**Método:** `GET`

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "message": "Productos sincronizados exitosamente",
  "count": 10,
  "objectIDs": ["rec123", "rec456", ...]
}
```

**Uso:**
```bash
curl https://tu-dominio.vercel.app/api/sync
```

### `/api/products` - Buscar productos

Busca productos en Algolia con paginación.

**Método:** `GET`

**Parámetros:**
- `q` (string, opcional) - Término de búsqueda
- `limit` (number, opcional, default: 10) - Cantidad de resultados por página (1-100)
- `offset` (number, opcional, default: 0) - Desplazamiento para paginación

**Ejemplo de respuesta:**
```json
{
  "results": [
    {
      "id": "rec123",
      "name": "Laptop HP Pavilion",
      "description": "Laptop potente para trabajo",
      "price": 899.99,
      "image": "https://...",
      "category": "Electrónica",
      "stock": 15,
      "sku": "LAP-001"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "total": 50
  }
}
```

**Ejemplos de uso:**

```bash
# Buscar "laptop" con 10 resultados
curl "https://tu-dominio.vercel.app/api/products?q=laptop&limit=10&offset=0"

# Obtener la segunda página (resultados 10-20)
curl "https://tu-dominio.vercel.app/api/products?q=laptop&limit=10&offset=10"

# Buscar sin término (obtener todos los productos)
curl "https://tu-dominio.vercel.app/api/products?limit=20&offset=0"
```

## 🌐 Deployment en Vercel

### Opción 1: Desde la interfaz de Vercel

1. Ve a https://vercel.com
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno en **Settings > Environment Variables**:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_ADMIN_API_KEY`
   - `ALGOLIA_INDEX_NAME`
5. Haz clic en **Deploy**

### Opción 2: Desde la terminal

```bash
# Instala Vercel CLI
npm i -g vercel

# Inicia sesión
vercel login

# Despliega el proyecto
vercel

# Para producción
vercel --prod
```

## ⏰ Configurar Sincronización Automática con cron-jobs.org

1. Ve a https://cron-job.org/
2. Crea una cuenta gratuita
3. Haz clic en **"Create cronjob"**
4. Configura:
   - **Title:** Sincronizar productos Airtable → Algolia
   - **URL:** `https://tu-dominio.vercel.app/api/sync`
   - **Schedule:** Cada hora (o la frecuencia que prefieras)
   - **Enabled:** ✅
5. Guarda el cronjob

**Frecuencias recomendadas:**
- Cada hora: `0 * * * *`
- Cada 6 horas: `0 */6 * * *`
- Cada día a las 3 AM: `0 3 * * *`

## 🧪 Probar la API Localmente

```bash
# Sincronizar productos
curl http://localhost:3000/api/sync

# Buscar productos
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=0"
```

## 📁 Estructura del Proyecto

```
buscador-de-productos/
├── app/
│   ├── api/
│   │   ├── sync/
│   │   │   └── route.ts      # Endpoint de sincronización
│   │   └── products/
│   │       └── route.ts      # Endpoint de búsqueda
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── airtable.ts           # Cliente de Airtable
│   └── algolia.ts            # Cliente de Algolia
├── .env.local                # Variables de entorno (no commitear)
├── vercel.json               # Configuración de Vercel
└── package.json
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 16** - Framework de React
- **TypeScript** - Tipado estático
- **Airtable** - Base de datos
- **Algolia** - Motor de búsqueda
- **Vercel** - Hosting y deployment

## 📝 Notas Importantes

- El endpoint `/api/sync` debe ejecutarse al menos una vez antes de poder buscar productos
- Las variables de entorno deben estar configuradas tanto en desarrollo como en producción
- Algolia tiene límites en el plan gratuito (10,000 búsquedas/mes)
- Airtable tiene límites de 5 requests/segundo en el plan gratuito
