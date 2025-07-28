# HYBE Latin America - Data Hub

## Autenticación Google OAuth

Este proyecto utiliza Next-Auth v4 con Google OAuth para autenticación. Solo usuarios con correos corporativos `@hybelatinamerica.com` pueden acceder.

### Configuración de Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ 
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente OAuth 2.0"
5. Configura:
   - Tipo de aplicación: Aplicación web
   - Orígenes autorizados: `http://localhost:3000` (desarrollo), `https://analytics.hybelatinamerica.com` (producción)
   - URIs de redirección: `http://localhost:3000/api/auth/callback/google` (desarrollo), `https://analytics.hybelatinamerica.com/api/auth/callback/google` (producción)

### Variables de Entorno

Copia `.env.example` a `.env.local` y completa:

```env
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
NEXTAUTH_SECRET=tu_secret_aqui
NEXTAUTH_URL=http://localhost:3000
```

#### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Despliegue en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade las variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET` 
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL=https://analytics.hybelatinamerica.com`

### Desarrollo Local

```bash
npm install
npm run dev
```

Visita `http://localhost:3000` y serás redirigido a la página de login.

### Estructura de Autenticación

- `/api/auth/[...nextauth]/route.ts` - Configuración de Next-Auth
- `/app/(auth)/signin/page.tsx` - Página de login
- `middleware.ts` - Protección de rutas
- Solo usuarios con email `@hybelatinamerica.com` pueden acceder

### Funcionalidades

- Autenticación OAuth con Google
- Restricción por dominio corporativo
- Protección automática de todas las rutas
- Redirección automática a login si no autenticado
- Interfaz de login corporativa