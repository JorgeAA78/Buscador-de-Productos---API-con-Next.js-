# 🖥️ Comandos para Git Bash - Guía Rápida

## 📝 Comandos que debes ejecutar en Git Bash

### 1. Probar el proyecto localmente

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Deberías ver algo como:
# ▲ Next.js 16.1.6
# - Local:        http://localhost:3000
# ✓ Ready in 2.5s
```

### 2. Probar los endpoints (en otra ventana de Git Bash)

```bash
# Sincronizar productos de Airtable a Algolia
curl http://localhost:3000/api/sync

# Buscar todos los productos
curl "http://localhost:3000/api/products?limit=10&offset=0"

# Buscar productos con término
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=0"
```

### 3. Subir el proyecto a GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Verificar el estado
git status

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - API de búsqueda de productos con Airtable y Algolia"

# Crear un repositorio en GitHub (ve a github.com y crea uno nuevo)
# Luego ejecuta estos comandos (reemplaza TU_USUARIO con tu usuario de GitHub):

git remote add origin https://github.com/TU_USUARIO/buscador-de-productos.git
git branch -M main
git push -u origin main
```

### 4. Deployar con Vercel CLI (opcional)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Iniciar sesión en Vercel
vercel login

# Deployar en modo preview
vercel

# Deployar a producción
vercel --prod
```

### 5. Ver logs del proyecto

```bash
# Ver logs en tiempo real (si usas Vercel CLI)
vercel logs

# Ver logs de desarrollo local
# Los logs aparecen automáticamente en la terminal donde ejecutaste npm run dev
```

### 6. Comandos útiles de npm

```bash
# Instalar dependencias
npm install

# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install

# Construir para producción
npm run build

# Iniciar en modo producción (después de build)
npm start

# Ejecutar linter
npm run lint
```

## 🧪 Comandos de Testing

### Probar endpoint de sincronización

```bash
# Local
curl -X GET http://localhost:3000/api/sync

# Producción (reemplaza con tu URL de Vercel)
curl -X GET https://tu-proyecto.vercel.app/api/sync
```

### Probar endpoint de búsqueda

```bash
# Buscar todos los productos (local)
curl "http://localhost:3000/api/products?limit=10&offset=0"

# Buscar con término (local)
curl "http://localhost:3000/api/products?q=laptop&limit=5&offset=0"

# Paginación - página 2 (local)
curl "http://localhost:3000/api/products?limit=10&offset=10"

# Producción (reemplaza con tu URL)
curl "https://tu-proyecto.vercel.app/api/products?q=laptop&limit=5"
```

### Ver respuesta formateada (con jq)

```bash
# Si tienes jq instalado, puedes formatear el JSON:
curl "http://localhost:3000/api/products?q=laptop" | jq

# Sin jq, la respuesta será en una sola línea
```

## 🔄 Comandos de Git útiles

```bash
# Ver el estado de los archivos
git status

# Ver el historial de commits
git log --oneline

# Ver las diferencias
git diff

# Agregar archivos específicos
git add archivo.ts

# Hacer commit con mensaje
git commit -m "Descripción del cambio"

# Subir cambios a GitHub
git push

# Bajar cambios de GitHub
git pull

# Ver las ramas
git branch

# Crear una nueva rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout main
```

## 📦 Comandos para actualizar el proyecto

```bash
# Después de hacer cambios en el código:

# 1. Ver qué archivos cambiaron
git status

# 2. Agregar los cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios realizados"

# 4. Subir a GitHub (esto automáticamente redeploya en Vercel)
git push
```

## 🛠️ Solución de Problemas

### Si el puerto 3000 está ocupado

```bash
# Matar el proceso en el puerto 3000
npx kill-port 3000

# O usar otro puerto
npm run dev -- -p 3001
```

### Si hay errores de módulos

```bash
# Limpiar y reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

### Si hay errores de TypeScript

```bash
# Verificar errores de TypeScript
npx tsc --noEmit

# Limpiar caché de Next.js
rm -rf .next
npm run dev
```

### Si Git Bash no reconoce npm

```bash
# Verificar que Node.js esté instalado
node --version
npm --version

# Si no están instalados, descarga Node.js de:
# https://nodejs.org/
```

## 📋 Checklist de Comandos en Orden

Ejecuta estos comandos en orden para completar el proyecto:

```bash
# 1. Verificar que estás en la carpeta correcta
pwd
# Deberías ver: /c/Users/Jorge Altamirano/SRC/dwf-m2/buscador-de-productos

# 2. Verificar que las dependencias están instaladas
ls node_modules
# Deberías ver carpetas de dependencias

# 3. Iniciar el servidor de desarrollo
npm run dev
# Espera a que diga "Ready"

# 4. En OTRA ventana de Git Bash, probar la sincronización
curl http://localhost:3000/api/sync
# Deberías ver: {"success":true,...}

# 5. Probar la búsqueda
curl "http://localhost:3000/api/products?limit=5"
# Deberías ver tus productos

# 6. Si todo funciona, detén el servidor (Ctrl+C) y sube a GitHub
git init
git add .
git commit -m "Initial commit"
# Crea el repo en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/buscador-de-productos.git
git push -u origin main

# 7. Deployar en Vercel (desde la web o CLI)
# Web: https://vercel.com → Import Project
# CLI: vercel --prod
```

## 🎯 Comandos Finales de Verificación

```bash
# Después de deployar en Vercel, verifica que todo funcione:

# Reemplaza TU_URL con tu URL de Vercel
export API_URL="https://tu-proyecto.vercel.app"

# Probar sincronización
curl $API_URL/api/sync

# Probar búsqueda
curl "$API_URL/api/products?q=laptop&limit=5"

# Si ambos funcionan, ¡éxito! 🎉
```

## 💡 Consejos

1. **Siempre usa Git Bash**, no PowerShell (por los problemas de permisos)
2. **Mantén dos ventanas abiertas**: una para el servidor (`npm run dev`) y otra para comandos
3. **Lee los errores**: Git Bash te mostrará mensajes útiles si algo falla
4. **Usa `Ctrl+C`** para detener el servidor de desarrollo
5. **Usa las flechas ↑↓** para navegar por el historial de comandos

## 📞 Comandos de Ayuda

```bash
# Ver ayuda de npm
npm help

# Ver ayuda de git
git --help

# Ver ayuda de Next.js
npx next --help

# Ver ayuda de Vercel
vercel --help
```

---

**Nota:** Todos estos comandos deben ejecutarse en **Git Bash**, no en PowerShell ni en CMD.
