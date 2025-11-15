# Guía de Despliegue

## Paso 1: Subir el código a GitHub

### 1.1 Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit: Gestor de Tareas con autenticación"
```

### 1.2 Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón "+" (arriba a la derecha) → "New repository"
3. Nombre del repositorio: `gestor-tareas` (o el que prefieras)
4. Descripción: "Gestor de tareas con autenticación"
5. Elige si será público o privado
6. **NO** marques "Initialize with README" (ya tenemos uno)
7. Haz clic en "Create repository"

### 1.3 Conectar y subir el código

```bash
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/gestor-tareas.git
git branch -M main
git push -u origin main
```

Si GitHub te pide autenticación, puedes usar:
- **Personal Access Token** (recomendado): Ve a Settings → Developer settings → Personal access tokens → Generate new token
- O configura SSH keys

---

## Paso 2: Desplegar en Render

### 2.1 Crear cuenta en Render

1. Ve a [Render](https://render.com)
2. Regístrate con tu cuenta de GitHub (recomendado) o email
3. Conecta tu cuenta de GitHub si usaste email

### 2.2 Crear nuevo Web Service

1. En el dashboard de Render, haz clic en "New +" → "Web Service"
2. Selecciona "Connect account" si no has conectado GitHub
3. Selecciona tu repositorio `gestor-tareas`
4. Haz clic en "Connect"

### 2.3 Configurar el servicio

**Configuración básica:**
- **Name**: `gestor-tareas` (o el nombre que prefieras)
- **Region**: Elige la región más cercana (ej: `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: (dejar vacío)
- **Runtime**: `Node`
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (para empezar)

**Variables de entorno:**
- No necesitas variables de entorno para este proyecto básico
- Si en el futuro necesitas una base de datos, las añadirías aquí

### 2.4 Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Esto puede tomar 5-10 minutos la primera vez
4. Una vez completado, verás una URL como: `https://gestor-tareas.onrender.com`

### 2.5 Configuraciones adicionales (opcional)

**Auto-deploy:**
- Por defecto, Render desplegará automáticamente cada vez que hagas push a `main`
- Puedes desactivarlo en Settings → Auto-Deploy

**Custom Domain:**
- En Settings → Custom Domains puedes añadir tu propio dominio

---

## Paso 3: Verificar el despliegue

1. Visita la URL que Render te proporcionó
2. Prueba crear una cuenta
3. Verifica que todas las funcionalidades funcionen

---

## Solución de problemas

### Error en el build

Si el build falla:
1. Revisa los logs en Render
2. Asegúrate de que `package.json` tenga el script `build`
3. Verifica que todas las dependencias estén en `package.json`

### La aplicación no carga

1. Verifica que el `Start Command` sea `npm start`
2. Revisa los logs en tiempo real en Render
3. Asegúrate de que el puerto sea el correcto (Render usa la variable `PORT` automáticamente)

### Problemas con dependencias

Si hay conflictos de dependencias:
- El comando de build ya incluye `--legacy-peer-deps`
- Si persisten problemas, revisa las versiones en `package.json`

---

## Alternativa: Desplegar en Vercel

Vercel es otra excelente opción para Next.js:

1. Ve a [Vercel](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa tu repositorio
4. Vercel detectará automáticamente Next.js
5. Haz clic en "Deploy"
6. ¡Listo! Vercel es más rápido para Next.js

---

## Actualizar el despliegue

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Render (o Vercel) desplegará automáticamente los cambios.

