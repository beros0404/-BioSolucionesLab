import PDFParser from "pdf2json";
import { PDFReportData, MicroorganismoResult } from "./types/pdf-data";

export async function parsePDFFile(
  buffer: Buffer
): Promise<PDFReportData | null> {
  return new Promise((resolve) => {
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("[v0] PDF parsing error:", errData.parserError);
      resolve(null);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const text = extractTextFromPdfData(pdfData);
        const result = parseExtractedText(text);
        resolve(result);
      } catch (error) {
        console.error("[v0] Error processing PDF data:", error);
        resolve(null);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}

function extractTextFromPdfData(pdfData: any): string {
  let text = "";
  const pages = pdfData.Pages || [];

  for (const page of pages) {
    const items = page.Texts || [];
    for (const item of items) {
      if (item.R && item.R.length > 0) {
        const textContent = item.R[0].T || "";
        text += decodeURIComponent(textContent) + " ";
      }
    }
    text += "\n";
  }

  return text;
}

function parseExtractedText(text: string): PDFReportData {
  // Extraer Código de Muestra - busca el patrón OA????
  const codigoMatch = text.match(/OA\d{3,4}/);
  const codigoMuestra = codigoMatch ? codigoMatch[0] : "";

  // Extraer fechas
  const fechaRecepcionMatch = text.match(
    /Fecha\s+Recepci[óo]n[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
  );
  const fechaRecepcion = fechaRecepcionMatch ? fechaRecepcionMatch[1] : "";

  const fechaAnalisisMatch = text.match(
    /Fecha\s+(?:Emisi[óo]n|An[áa]lisis)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
  );
  const fechaAnalisis = fechaAnalisisMatch ? fechaAnalisisMatch[1] : "";

  // Extraer subtipo de análisis (ej: "Mycoplasma gallisepticum", "APP", "APEC")
  const subtipoMatch = text.match(/Bio-(.+?)(?:\s*-\s*\d+\s*-|[\n\r])/);
  const subtipoAnalisis = subtipoMatch ? subtipoMatch[1].trim() : "";

  // Extraer tabla de resultados
  const microorganismos = extractMicroorganismos(text);

    // Extraer Código de Muestra - busca el patrón OA????
    const codigoMatch = text.match(/OA\d{3}/);
    const codigoMuestra = codigoMatch ? codigoMatch[0] : "";

    // Extraer fechas
    const fechaRecepcionMatch = text.match(
      /Fecha\s+Recepci[óo]n[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
    );
    const fechaRecepcion = fechaRecepcionMatch ? fechaRecepcionMatch[1] : "";

    const fechaAnalisisMatch = text.match(
      /Fecha\s+(?:Emisi[óo]n|An[áa]lisis)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
    );
    const fechaAnalisis = fechaAnalisisMatch ? fechaAnalisisMatch[1] : "";

    // Extraer subtipo de análisis (ej: "Mycoplasma gallisepticum", "APP", "APEC")
    const subtipoMatch = text.match(
      /Bio-(.+?)(?:\s*-\s*\d+\s*-|[\n\r])/
    );
    const subtipoAnalisis = subtipoMatch ? subtipoMatch[1].trim() : "";

    // Extraer tabla de resultados
    const microorganismos = extractMicroorganismos(text);

    return {
      codigoMuestra,
      laboratorio: "BioSoluciones Lab",
      fechaRecepcion,
      fechaAnalisis,
      subtipoAnalisis,
      microorganismos,
    };
}

function extractMicroorganismos(text: string): MicroorganismoResult[] {
  const resultados: MicroorganismoResult[] = [];

  // Buscar tabla de resultados - usualmente después de "Resultados" o similar
  // Patrón general: nombre | resultado | CT (opcional) | Copias
  const lines = text.split(/[\n\r]+/);

  let inResultsTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detectar inicio de tabla
    if (
      line.toLowerCase().includes("resultado") ||
      line.toLowerCase().includes("microorganismo")
    ) {
      inResultsTable = true;
      continue;
    }

    // Si estamos en tabla y encontramos línea de datos
    if (inResultsTable && line.length > 0 && !line.includes("---")) {
      // Patrón: Nombre | Resultado | CT | Copias
      const parts = line.split(/\s*\|\s*/).map((p) => p.trim());

      if (parts.length >= 2) {
        const microorganismo = parts[0];
        let resultado = parts[1] || "";
        let ct = "";
        let copias = "";

        // Buscar CT (generalmente es un número)
        if (parts.length >= 3) {
          const ctCandidate = parts[2];
          if (/^\d+$|^\d+\.\d+$/.test(ctCandidate)) {
            ct = ctCandidate;
            copias = parts[3] || "";
          } else {
            copias = ctCandidate;
          }
        }

        // Procesar resultado: + = presente, - = ausente
        if (resultado === "+" || resultado === "-") {
          resultado = resultado === "+" ? "Presente" : "Ausente";
        }

        resultados.push({
          microorganismo,
          resultado,
          ct: ct || undefined,
          copias: copias || undefined,
          unidadMedida: "copias/μl",
        });
      }
    }

    // Detectar fin de tabla
    if (inResultsTable && line.toLowerCase().includes("observaciones")) {
      break;
    }
  }

  return resultados;
}
