# 📚 Ejemplos de Uso de la API

## 🔄 Endpoint: `/api/sync`

### Ejemplo 1: Sincronización básica

**Comando en Git Bash:**
```bash
curl http://localhost:3000/api/sync
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Productos sincronizados exitosamente",
  "count": 15,
  "objectIDs": [
    "rec1234567890",
    "rec0987654321",
    "rec1122334455"
  ]
}
```

**Respuesta con error:**
```json
{
  "success": false,
  "message": "Error al sincronizar productos",
  "error": "Invalid API key"
}
```

### Ejemplo 2: Sincronización en producción

```bash
curl https://tu-proyecto.vercel.app/api/sync
```

---

## 🔍 Endpoint: `/api/products`

### Ejemplo 1: Buscar todos los productos (sin filtro)

**Comando:**
```bash
curl "http://localhost:3000/api/products?limit=10&offset=0"
```

**Respuesta:**
```json
{
  "results": [
    {
      "id": "rec123",
      "name": "Laptop HP Pavilion 15",
      "description": "Laptop potente con procesador Intel Core i7",
      "price": 899.99,
      "image": "https://dl.airtable.com/.../laptop.jpg",
      "category": "Electrónica",
      "stock": 15,
      "sku": "LAP-HP-001"
    },
    {
      "id": "rec456",
      "name": "Mouse Logitech MX Master 3",
      "description": "Mouse inalámbrico ergonómico",
      "price": 99.99,
      "image": "https://dl.airtable.com/.../mouse.jpg",
      "category": "Accesorios",
      "stock": 50,
      "sku": "MOU-LOG-001"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "total": 25
  }
}
```

### Ejemplo 2: Buscar productos por término

**Buscar "laptop":**
```bash
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=0"
```

**Buscar "mouse":**
```bash
curl "http://localhost:3000/api/products?q=mouse&limit=5&offset=0"
```

**Buscar por categoría:**
```bash
curl "http://localhost:3000/api/products?q=electrónica&limit=10&offset=0"
```

### Ejemplo 3: Paginación

**Primera página (productos 1-10):**
```bash
curl "http://localhost:3000/api/products?q=&limit=10&offset=0"
```

**Segunda página (productos 11-20):**
```bash
curl "http://localhost:3000/api/products?q=&limit=10&offset=10"
```

**Tercera página (productos 21-30):**
```bash
curl "http://localhost:3000/api/products?q=&limit=10&offset=20"
```

**Ejemplo con búsqueda y paginación:**
```bash
# Primera página de laptops
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=0"

# Segunda página de laptops
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=5"
```

### Ejemplo 4: Diferentes tamaños de página

**5 productos por página:**
```bash
curl "http://localhost:3000/api/products?limit=5&offset=0"
```

**20 productos por página:**
```bash
curl "http://localhost:3000/api/products?limit=20&offset=0"
```

**50 productos por página:**
```bash
curl "http://localhost:3000/api/products?limit=50&offset=0"
```

### Ejemplo 5: Manejo de errores

**Límite inválido (mayor a 100):**
```bash
curl "http://localhost:3000/api/products?limit=150&offset=0"
```

**Respuesta:**
```json
{
  "success": false,
  "message": "El parámetro limit debe estar entre 1 y 100"
}
```

**Offset negativo:**
```bash
curl "http://localhost:3000/api/products?limit=10&offset=-5"
```

**Respuesta:**
```json
{
  "success": false,
  "message": "El parámetro offset debe ser mayor o igual a 0"
}
```

---

## 🌐 Ejemplos con JavaScript/Fetch

### En el navegador o Node.js:

```javascript
// Sincronizar productos
async function syncProducts() {
  const response = await fetch('https://tu-proyecto.vercel.app/api/sync');
  const data = await response.json();
  console.log(data);
}

// Buscar productos
async function searchProducts(query, limit = 10, offset = 0) {
  const url = `https://tu-proyecto.vercel.app/api/products?q=${query}&limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Uso
searchProducts('laptop', 10, 0).then(data => {
  console.log('Resultados:', data.results);
  console.log('Total:', data.pagination.total);
});
```

---

## 🐍 Ejemplos con Python

```python
import requests

# Sincronizar productos
def sync_products():
    response = requests.get('https://tu-proyecto.vercel.app/api/sync')
    return response.json()

# Buscar productos
def search_products(query='', limit=10, offset=0):
    url = f'https://tu-proyecto.vercel.app/api/products'
    params = {
        'q': query,
        'limit': limit,
        'offset': offset
    }
    response = requests.get(url, params=params)
    return response.json()

# Uso
result = search_products('laptop', limit=5)
print(f"Encontrados {result['pagination']['total']} productos")
for product in result['results']:
    print(f"- {product['name']}: ${product['price']}")
```

---

## 📱 Ejemplo de aplicación completa (React)

```jsx
import { useState, useEffect } from 'react';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ offset: 0, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const searchProducts = async (searchQuery, offset = 0) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?q=${searchQuery}&limit=10&offset=${offset}`
      );
      const data = await response.json();
      setProducts(data.results);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(query, 0);
  };

  const nextPage = () => {
    const newOffset = pagination.offset + pagination.limit;
    searchProducts(query, newOffset);
  };

  const prevPage = () => {
    const newOffset = Math.max(0, pagination.offset - pagination.limit);
    searchProducts(query, newOffset);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={prevPage} disabled={pagination.offset === 0}>
              Anterior
            </button>
            <span>
              Mostrando {pagination.offset + 1} - {Math.min(pagination.offset + pagination.limit, pagination.total)} de {pagination.total}
            </span>
            <button 
              onClick={nextPage} 
              disabled={pagination.offset + pagination.limit >= pagination.total}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## 🧪 Testing con Postman

### Colección de Postman

1. **Sincronizar Productos**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/sync`
   - Variables: `baseUrl = https://tu-proyecto.vercel.app`

2. **Buscar Todos los Productos**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/products?limit=10&offset=0`

3. **Buscar con Query**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/products?q=laptop&limit=10&offset=0`

4. **Paginación**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/products?q=&limit=10&offset={{offset}}`
   - Variables: `offset = 0, 10, 20, etc.`

---

## 💡 Casos de Uso Comunes

### 1. Catálogo de productos con búsqueda
```bash
# Usuario busca "zapatillas"
curl "https://tu-proyecto.vercel.app/api/products?q=zapatillas&limit=12&offset=0"
```

### 2. Autocompletado de búsqueda
```bash
# Mientras el usuario escribe "lap..."
curl "https://tu-proyecto.vercel.app/api/products?q=lap&limit=5&offset=0"
```

### 3. Filtrar por categoría
```bash
# Mostrar solo productos de "Electrónica"
curl "https://tu-proyecto.vercel.app/api/products?q=electrónica&limit=20&offset=0"
```

### 4. Infinite scroll
```javascript
let offset = 0;
const limit = 20;

async function loadMore() {
  const data = await searchProducts('', limit, offset);
  appendProducts(data.results);
  offset += limit;
}
```

### 5. Sincronización nocturna
```bash
# Configurar en cron-job.org para ejecutar a las 3 AM
# Expresión cron: 0 3 * * *
# URL: https://tu-proyecto.vercel.app/api/sync
```
