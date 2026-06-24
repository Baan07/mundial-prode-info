# TODO

- Conectar Supabase real: crear proyecto, ejecutar `supabase/schema.sql` y cargar `.env.local`.
- Reemplazar datos mock de `src/lib/data.ts` por consultas a Supabase.
- Implementar autenticacion completa en `/admin`, `/prode` y `/mi-prode`.
- Agregar acciones server/client para crear grupos, invitar miembros y guardar predicciones.
- Conectar una API externa de futbol usando `FOOTBALL_API_KEY` y `FOOTBALL_API_BASE_URL`.
- Automatizar bloqueo de predicciones al horario de inicio del partido.
- Agregar notificaciones push y modo live cuando haya proveedor de resultados en vivo.
