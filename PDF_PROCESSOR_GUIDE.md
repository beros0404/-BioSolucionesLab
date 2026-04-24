# Guía de Uso: Procesador de PDFs de BioSoluciones Lab

## 📋 Descripción General

El Procesador de PDFs es una herramienta administrativa que convierte reportes PDF generados por BioSoluciones Lab en archivos Excel con mapeo automático de datos. Solo administradores autorizados pueden acceder a esta funcionalidad.

## 🔐 Autenticación

### Acceso Administrativo

1. **Desde la página principal**: Haz clic en el botón "Admin" en la esquina superior derecha
2. **Ingresa tus credenciales**: Email y contraseña de administrador
3. **Confirma tu email**: Si es tu primer acceso, confirma tu dirección de correo
4. **Accede al procesador**: Serás redirigido automáticamente a `/pdf-processor`

### Crear Nuevos Usuarios Admin

Los nuevos usuarios admin deben ser creados en Supabase con el flag `is_admin: true` en sus metadatos de usuario.

## 🎯 Funcionalidades Principales

### 1. Carga de PDFs
- **Drag & Drop**: Arrastra PDFs directamente a la zona de carga
- **Seleccionar archivos**: Haz clic para abrir el navegador de archivos
- **Múltiples archivos**: Puedes procesar varios PDFs simultáneamente
- **Vista previa**: Cada archivo cargado muestra su nombre y tamaño

### 2. Procesamiento Automático

El sistema extrae automáticamente los siguientes datos de cada PDF:

| Campo PDF | Campo Excel | Descripción |
|-----------|------------|-------------|
| Código de muestra | Código de Orden | Ej: OAE081, OAI145 |
| Laboratorio | Laboratorio | Siempre: BioSoluciones Lab |
| Fecha Recepción | Fecha Recepción Muestra | Fecha de entrada de la muestra |
| Fecha Análisis | Fecha Emisión de Informe | Fecha del reporte |
| Subtítulo del PDF | Subtipo de Análisis | Ej: Mycoplasma gallisepticum, APP, APEC |
| Nombres de columnas | Microorganismo | Mapeo usando diccionario |
| Valores de tabla | Resultado | Presente (+), Ausente (-), o valor numérico |
| Valor CT | CT | Solo si está presente en el PDF |
| Copias/reacciones | Cuantificación Bacteriana | Valor de cuantificación |
| - | Unidad de Medida | Siempre: copias/μl |

### 3. Mapeo de Nombres

El sistema utiliza un diccionario para mapear nombres de microorganismos del PDF al formato estándar del Excel. Ejemplos:

- `Mycoplasma gallisepticum` → `Mycoplasma gallisepticum`
- `APP`, `APEC` → `Avian Pathogenic E. coli (APEC)`
- `Newcastle` → `Newcastle`

### 4. Descarga de Excel

- Se genera automáticamente un archivo Excel con el nombre: `Reporte_BioSoluciones_YYYY-MM-DD.xlsx`
- Una fila por cada microorganismo procesado
- Todos los campos mapeados correctamente

## 📊 Estructura del Archivo Excel

El archivo generado contiene una tabla con las siguientes columnas:

```
Código de Orden | Laboratorio | Fecha Recepción Muestra | Fecha Emisión de Informe | 
Subtipo de Análisis | Microorganismo | Resultado | CT | Cuantificación Bacteriana | 
Unidad de Medida
```

### Ejemplo de Salida

Para un PDF con 3 microorganismos, se generarán 3 filas:

| Código | Laboratorio | ... | Microorganismo | Resultado | CT | Copias | Unidad |
|--------|-------------|-----|-----------------|-----------|----|---------|----- |
| OAE081 | BioSoluciones Lab | ... | Mycoplasma gallisepticum | Presente | 18.5 | 1000 | copias/μl |
| OAE081 | BioSoluciones Lab | ... | Mycoplasma synoviae | Ausente | - | - | copias/μl |
| OAE081 | BioSoluciones Lab | ... | Newcastle | Presente | 22.1 | 500 | copias/μl |

## 🛡️ Seguridad

- ✅ Solo usuarios autenticados pueden acceder
- ✅ Solo usuarios con flag `is_admin: true` pueden procesar PDFs
- ✅ Las sesiones se autentican mediante Supabase
- ✅ Los datos se procesan en el servidor (no en el navegador)
- ✅ Los PDFs no se guardan en el servidor

## 📝 Archivos Soportados

El procesador está optimizado para PDFs generados por BioSoluciones Lab que contengan:
- Datos de identificación de muestra
- Fechas de recepción y análisis
- Tablas con resultados de microorganismos
- Valores de CT (si aplica)
- Cuantificación bacteriana (copias/reacciones)

## ⚙️ Configuración Técnica

### Variables de Entorno Requeridas

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
```

### Diccionario de Mapeo

El diccionario se carga desde `/public/dictionary.json` y mapea nombres de PDF a nombres estándar de Excel.

## 🐛 Solución de Problemas

### "Error de autenticación"
- Verifica que tu cuenta esté marcada como admin en Supabase
- Confirma tu email si es tu primer acceso

### "No se encontraron datos en el PDF"
- Asegúrate de que el PDF contiene tabla de resultados
- Verifica que el PDF sea de los tipos soportados

### "Error al procesar PDF"
- Intenta cargar un PDF diferente
- Verifica la consola del navegador para más detalles

## 📞 Soporte

Para más información o reportar problemas, contacta al equipo de administración de BioSoluciones Lab.

---

**Última actualización**: Abril 2026
**Versión**: 1.0.0
