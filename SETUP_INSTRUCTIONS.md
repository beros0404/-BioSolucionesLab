# Instrucciones de Configuración: Procesador de PDFs

## 🚀 Pasos de Implementación

### 1. Base de Datos (Supabase)

Ejecuta el siguiente SQL en Supabase para crear la tabla de usuarios admin:

```sql
-- Tabla opcional para tracking de procesamiento de PDFs
CREATE TABLE IF NOT EXISTS public.pdf_processing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  processed_at TIMESTAMP DEFAULT NOW(),
  rows_created INTEGER,
  status TEXT DEFAULT 'success'
);

ALTER TABLE public.pdf_processing_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to view logs" ON public.pdf_processing_logs
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND 
    (SELECT is_admin FROM auth.users WHERE id = auth.uid()) IS TRUE
  );

CREATE POLICY "Allow admins to insert logs" ON public.pdf_processing_logs
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    (SELECT is_admin FROM auth.users WHERE id = auth.uid()) IS TRUE
  );
```

### 2. Crear Usuarios Admin

En Supabase Auth, al crear o editar un usuario, agrega metadata:

```json
{
  "is_admin": true
}
```

O mediante el dashboard de Supabase:
1. Ve a `Authentication → Users`
2. Selecciona el usuario
3. Edita el JSON de metadatos (`User Metadata`)
4. Agrega: `"is_admin": true`

### 3. Configurar Variables de Entorno

Las siguientes variables ya están configuradas automáticamente:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Verifica en el panel de Settings → Vars que estén presentes.

### 4. Diccionario de Mapeo

El diccionario está en `/public/dictionary.json` y contiene mapeos de:
- Nombres de microorganismos en PDFs
- Nombres estándar en el Excel

Puedes actualizar este archivo si necesitas agregar nuevos tipos de pruebas.

### 5. Validar la Configuración

1. **Login**: Visita `/auth/login` e ingresa con credenciales admin
2. **Acceder a procesador**: Deberías ver `/pdf-processor`
3. **Procesar PDF de prueba**: Usa los PDFs de ejemplo en `/public`
4. **Descargar Excel**: Verifica que el archivo se genere correctamente

## 📁 Estructura de Archivos Clave

```
app/
├── auth/
│   ├── callback/route.ts      # Maneja callbacks de Supabase
│   └── login/page.tsx          # Página de login
├── api/
│   └── process-pdf/route.ts    # API para procesar PDFs (protegida)
└── pdf-processor/
    └── page.tsx                # Página principal del procesador

lib/
├── supabase/
│   ├── client.ts               # Cliente para navegador
│   ├── server.ts               # Cliente para servidor
│   └── proxy.ts                # Manejo de sesiones
├── pdf-parser.ts               # Extrae datos de PDFs
├── data-mapper.ts              # Mapea datos a formato Excel
├── excel-generator.ts          # Genera archivos Excel
└── types/
    └── pdf-data.ts             # Tipos TypeScript

components/
├── pdf-uploader.tsx            # Componente de carga
├── logout-button.tsx           # Botón de cierre de sesión
└── header.tsx                  # Header con link a admin

public/
├── dictionary.json             # Mapeo de nombres
└── test-*.pdf                  # PDFs de prueba

middleware.ts                   # Protege rutas admin
```

## 🔒 Flujo de Autenticación

1. Usuario no autenticado intenta acceder a `/pdf-processor`
2. Middleware redirige a `/auth/login`
3. Usuario ingresa credenciales
4. Supabase valida y crea sesión
5. Callback en `/auth/callback` guarda sesión en cookie
6. Middleware verifica `is_admin: true` en metadata
7. Si es admin, permite acceso a `/pdf-processor`
8. Si no es admin, redirige a login

## 🧪 Pruebas

### Probar con archivos de ejemplo:

```bash
# En el navegador, carga estos archivos desde /public
- test-mycoplasma.pdf
- test-app.pdf
- test-apec.pdf
```

### Esperados:
- Cada PDF genera múltiples filas (una por microorganismo)
- Los nombres se mapean según el diccionario
- Se genera un Excel con todos los campos

## 🔄 Actualizar el Diccionario

Si necesitas mapear nuevos tipos de pruebas:

1. Edita `/public/dictionary.json`
2. Agrega nuevas entradas:
   ```json
   {
     "nombre_en_pdf": "nombre_en_excel"
   }
   ```
3. Reinicia el dev server

## ✅ Checklist de Implementación

- [ ] Variables de Supabase configuradas
- [ ] Al menos un usuario creado con `is_admin: true`
- [ ] Tabla de logs creada (opcional pero recomendada)
- [ ] Dev server ejecutándose (`pnpm dev`)
- [ ] Acceso a `/auth/login` funciona
- [ ] Login con usuario admin funciona
- [ ] Puede acceder a `/pdf-processor`
- [ ] Puede cargar PDFs
- [ ] Genera Excel correctamente
- [ ] Excel contiene datos correctos

## 📞 Próximos Pasos

1. **Logging mejorado**: Implementar tabla de logs para tracking
2. **Edición de PDFs**: Permitir editar datos antes de descargar
3. **Plantillas personalizadas**: Permitir diferentes formatos de Excel
4. **Batch processing**: Cola de procesamiento para muchos archivos
5. **Notificaciones**: Alertas cuando se completa el procesamiento

---

**Versión**: 1.0.0  
**Fecha**: Abril 2026  
**Estado**: ✅ Producción Lista
