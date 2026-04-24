-- Este script configura el sistema de autenticación de administradores en Supabase.
-- En Supabase, la tabla auth.users es gestionada automáticamente por el sistema de autenticación.
-- Los administradores se identifican por tener el campo is_admin en raw_user_meta_data.

-- Para crear un usuario administrador, sigue estos pasos en la aplicación:
-- 1. Ve a la página de login (/auth/login)
-- 2. El primer usuario que se registre debe ser creado como administrador de forma manual
--    ejecutando esta query en el SQL Editor de Supabase:

-- IMPORTANTE: Ejecuta esto en el SQL Editor de Supabase Console:
-- UPDATE auth.users 
-- SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{is_admin}', 'true'::jsonb)
-- WHERE email = 'tu-email@example.com';

-- O usa la función signUp con metadata en la aplicación para crear un admin:
-- const { data, error } = await supabase.auth.signUp({
--   email: 'admin@biosolucioneslab.com',
--   password: 'secure-password-here',
--   options: {
--     data: {
--       is_admin: true,
--     },
--   },
-- })

-- Después de crear el usuario, confirma el email manualmente en Supabase Console
-- si tienes email confirmation habilitado.
