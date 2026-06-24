# Mundial Prode Info

Web-app PWA sobre el Mundial 2026 orientada a usuarios de Argentina que juegan prodes recreativos entre amigos, empresas, clubes o comercios.

Incluye Home, Fixture, pagina de partido con motor de prediccion interno, selecciones, jugadores, goleadores, prode basico, panel de usuario, admin basico, SQL de Supabase con RLS, estructura para APIs externas y configuracion de Netlify.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase preparado para DB/Auth/Storage
- Netlify compatible con `@netlify/plugin-nextjs`

## Instalacion

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FOOTBALL_API_KEY=
FOOTBALL_API_BASE_URL=
```

## Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar `supabase/schema.sql` en el SQL editor.
3. Cargar datos de equipos, jugadores y partidos.
4. Configurar Auth para email magic link o password.
5. Crear una regla de admin global, por ejemplo usando custom claims o una tabla `admin_users`.

## Admin

El panel `/admin` ya tiene UI para editar partidos, cargar entidades y recalcular puntos. En esta primera version usa datos mock; para produccion se deben conectar server actions o endpoints a Supabase y proteger la ruta con Auth.

## Predicciones

`src/lib/predictionEngine.ts` calcula probabilidades simples usando fuerza base, forma reciente, importancia del partido y localia leve. No usa IA externa. Devuelve probabilidades, marcador estimado, confianza, riesgo y explicacion breve.

Predicciones con fines informativos y de entretenimiento. No garantizan resultados.

## Deploy Netlify

```bash
npm run build
npx netlify-cli deploy --build
npx netlify-cli deploy --prod --build
```

Si el sitio ya esta enlazado:

```bash
npx netlify-cli link
```
