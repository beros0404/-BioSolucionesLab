"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreview {
  name: string;
  size: number;
  status: "pending" | "processing" | "success" | "error";
  error?: string;
}

export function PDFUploader() {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (droppedFiles: File[]) => {
    const pdfFiles = droppedFiles.filter((file) =>
      file.type === "application/pdf"
    );

    if (pdfFiles.length === 0) {
      alert("Por favor, sube solo archivos PDF");
      return;
    }

    const newFiles = pdfFiles.map((file) => ({
      name: file.name,
      size: file.size,
      status: "pending" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcessPDFs = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    // Actualizar estado a processing
    const fileInputElements = document.querySelectorAll(
      "[data-file-index]"
    ) as NodeListOf<HTMLDivElement>;
    
    try {
      const formData = new FormData();

      // Agregar cada archivo al formData
      for (const filePreview of files) {
        // Necesitamos acceder al File original - lo vamos a pasar como parte del flujo
        const fileName = filePreview.name;
        setFiles((prev) =>
          prev.map((f) =>
            f.name === fileName ? { ...f, status: "processing" } : f
          )
        );
      }

      // Obtener archivos del input - vamos a usar un enfoque diferente
      const input = fileInputRef.current;
      if (!input || !input.files) {
        // Si no tenemos acceso a los archivos, recrear desde los nombres
        alert("Error: No se pueden acceder a los archivos. Por favor, recarga la página.");
        setIsProcessing(false);
        return;
      }

      for (let i = 0; i < input.files.length; i++) {
        formData.append("files", input.files[i]);
      }

      const response = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al procesar PDFs");
      }

      // Descargar el Excel
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Reporte_BioSoluciones_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Marcar archivos como exitosos
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: "success" }))
      );
    } catch (error) {
      console.error("[v0] Error processing PDFs:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      setFiles((prev) =>
        prev.map((f) => ({
          ...f,
          status: "error",
          error: errorMessage,
        }))
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const canProcess = files.length > 0 && files.some((f) => f.status === "pending");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Arrastra PDFs aquí o haz clic para seleccionar
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Puedes subir múltiples archivos PDF de reportes de BioSoluciones
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
          aria-label="Seleccionar archivos PDF"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          disabled={isProcessing}
        >
          Seleccionar archivos
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-900">
            Archivos seleccionados ({files.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                data-file-index={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {file.status === "processing" && (
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin flex-shrink-0" />
                  )}
                  {file.status === "success" && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                  {file.status === "pending" && (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.error && (
                      <p className="text-xs text-red-500 mt-1">{file.error}</p>
                    )}
                  </div>
                </div>
                {!isProcessing && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
                    aria-label="Eliminar archivo"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleProcessPDFs}
            disabled={!canProcess || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              "Procesar y Descargar Excel"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
