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
    const pageLines: string[] = [];

    for (const item of items) {
      if (item.R && item.R.length > 0) {
        const textContent = item.R[0].T || "";
        pageLines.push(decodeURIComponent(textContent));
      }
    }

    text += pageLines.join(" ") + "\n";
  }

  return text;
}

function parseExtractedText(text: string): PDFReportData {
  // Extraer Código de Muestra (patrón: OA?????)
  const codigoMatch = text.match(/OA\d{3,4}/);
  const codigoMuestra = codigoMatch ? codigoMatch[0] : "";

  // Extraer fechas con formato flexible
  const fechaRecepcionMatch = text.match(
    /Fecha\s+Recepci[óo]n[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
  );
  const fechaRecepcion = fechaRecepcionMatch ? fechaRecepcionMatch[1] : "";

  const fechaAnalisisMatch = text.match(
    /Fecha\s+(?:Emisi[óo]n|An[áa]lisis)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
  );
  const fechaAnalisis = fechaAnalisisMatch ? fechaAnalisisMatch[1] : "";

  // Extraer subtipo de análisis (ej: "Mycoplasma gallisepticum", "APP", "APEC")
  // Busca el patrón después de "Bio-"
  const subtipoMatch = text.match(/Bio-(.+?)(?:\s*-\s*\d+\s*-|[\n\r]|$)/);
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
  const results: MicroorganismoResult[] = [];

  // Patrones para buscar tablas de resultados
  const lines = text.split(/[\n\r]+/);

  let tableStartIndex = -1;

  // Buscar el inicio de la tabla
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (
      line.includes("resultado") ||
      (line.includes("ct") && line.includes("resultado"))
    ) {
      tableStartIndex = i;
      break;
    }
  }

  if (tableStartIndex === -1) return results;

  // Procesar líneas desde el inicio de la tabla
  for (let i = tableStartIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Saltar líneas vacías
    if (!line || line.length < 3) continue;

    // Saltar líneas que parecen ser encabezados o pies de página
    if (
      line.match(/^(Resultado|Ct|Copias|Muestra|Fecha)/i) ||
      line.match(/Página|Page|Total|Observaciones/i)
    ) {
      continue;
    }

    // Saltar si es una línea separadora
    if (line.match(/^-+$|^\|/)) {
      continue;
    }

    // Extraer nombre del microorganismo y valores
    const parts = line.split(/\s+/);

    if (parts.length < 2) continue;

    // El primer parte es el nombre del microorganismo
    const microorganism = parts[0];

    // Buscar en la línea los valores de Resultado, CT, y Copias
    const resultado = extraerResultado(line);
    const ct = extraerCT(line);
    const copias = extraerCopias(line);

    if (resultado || ct || copias) {
      results.push({
        microorganismo: microorganism,
        resultado: resultado || "",
        ct: ct || "",
        copias: copias || "",
        unidadMedida: "copias/μl",
      });
    }
  }

  return results;
}

function extraerResultado(line: string): string {
  // Buscar patrones como: "Presente", "Ausente", "+", "-", o valores
  const resultadoMatch = line.match(
    /(?:Presente|Ausente|Positivo|Negativo|\+|-|Detectado|No\s+detectado)/i
  );
  if (resultadoMatch) {
    const texto = resultadoMatch[0].toLowerCase();
    if (texto === "+" || texto === "presente" || texto === "detectado") {
      return "Presente";
    } else if (texto === "-" || texto === "ausente" || texto === "no detectado") {
      return "Ausente";
    }
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  // Si no hay patrones obvios, buscar números
  const numMatch = line.match(/\d+\.?\d*/);
  if (numMatch) {
    return numMatch[0];
  }

  return "";
}

function extraerCT(line: string): string {
  // CT son números generalmente entre 15-40 con decimales
  const ctMatch = line.match(/(?:CT|Ct)[:\s]*(\d+\.?\d*)/i);
  if (ctMatch) {
    return ctMatch[1];
  }

  // Alternativa: buscar un número que típicamente sea CT (15-40)
  const numMatches = line.match(/\d+\.?\d*/g);
  if (numMatches && numMatches.length > 0) {
    for (const num of numMatches) {
      const val = parseFloat(num);
      if (val >= 15 && val <= 45) {
        return num;
      }
    }
  }

  return "";
}

function extraerCopias(line: string): string {
  // Buscar patrones de copias/reacciones o copias/µl
  const copiasMatch = line.match(
    /(\d+\.?\d*)\s*(?:copias|cps|copies)(?:\/|_)?(?:reacci[óo]n|µl|ul)?/i
  );
  if (copiasMatch) {
    return copiasMatch[1];
  }

  return "";
}
