# TaskMaster

Una aplicación web moderna para gestionar tus tareas con autenticación de usuarios, búsqueda y filtrado.

## Características

- ✅ Autenticación de usuarios (Login y Registro)
- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Búsqueda de tareas en tiempo real
- ✅ Filtrado de tareas (Todas, Pendientes, Completadas)
- ✅ Interfaz moderna y responsive
- ✅ Persistencia de datos en localStorage

## Tecnologías

- **Next.js 16** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Radix UI** - Componentes accesibles

## Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## Despliegue

### Render

1. Conecta tu repositorio de GitHub a Render
2. Selecciona "Web Service"
3. Configuración:
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Node Version**: `18.x` o superior

### Vercel (Alternativa)

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

## Estructura del Proyecto

```
├── app/              # Páginas y rutas
│   ├── login/        # Página de login
│   ├── register/     # Página de registro
│   └── page.tsx      # Página principal
├── components/        # Componentes reutilizables
│   ├── ui/           # Componentes UI base
│   ├── task-*.tsx    # Componentes de tareas
│   └── auth-guard.tsx
├── contexts/          # Contextos de React
│   └── auth-context.tsx
└── lib/               # Utilidades
```

## Licencia

MIT

