import { PDFUploader } from "@/components/pdf-uploader";
import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Procesador de PDFs - BioSoluciones Lab",
  description: "Convierte reportes PDF a formato Excel con mapeo automático de datos",
};

export default async function PDFProcessorPage() {
  // Validar autenticación del usuario
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario o no es admin, redirigir a login
  if (!user || !user.user_metadata?.is_admin) {
    redirect("/auth/login");
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">BioSoluciones Lab</h2>
            <p className="text-sm text-gray-600">Procesador de Reportes Administrativo</p>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Procesador de Reportes PDF
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Carga tus reportes PDF de análisis de BioSoluciones Lab y obtén un archivo Excel
            con los datos mapeados automáticamente al formato estándar.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <PDFUploader />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="font-semibold text-gray-900 mb-2">Selecciona PDFs</h3>
            <p className="text-sm text-gray-600">
              Arrastra o selecciona múltiples reportes PDF de análisis
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="font-semibold text-gray-900 mb-2">Procesa</h3>
            <p className="text-sm text-gray-600">
              El sistema mapea automáticamente los datos según el diccionario
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="font-semibold text-gray-900 mb-2">Descarga Excel</h3>
            <p className="text-sm text-gray-600">
              Obtén el archivo Excel listo para cargar en tu gestor de datos
            </p>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
