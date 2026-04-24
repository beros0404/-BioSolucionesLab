import { PDFReportData, ExcelRow, MicroorganismoResult } from "./types/pdf-data";

// Diccionario de mapeo de nombres del PDF a nombres del Excel
let nameMapping: { [key: string]: string } = {
  // Mycoplasma
  "Mycoplasma gallisepticum": "Mycoplasma gallisepticum",
  "Mycoplasma synoviae": "Mycoplasma synoviae",

  // Bacteria
  APP: "Avian Pathogenic E. coli (APEC)",
  APEC: "Avian Pathogenic E. coli (APEC)",
  "Avian Pathogenic E. coli": "Avian Pathogenic E. coli (APEC)",

  // Virus
  Newcastle: "Newcastle",
  "Influenza Aviar": "Influenza Aviar",

  // Otros
  Salmonella: "Salmonella",
  "E. coli": "E. coli",
};

export function setNameMapping(mapping: { [key: string]: string }) {
  nameMapping = mapping;
}

export function mapMicroorganismoName(pdfName: string): string {
  // Buscar coincidencia exacta primero
  if (nameMapping[pdfName]) {
    return nameMapping[pdfName];
  }

  // Buscar coincidencia parcial
  for (const [key, value] of Object.entries(nameMapping)) {
    if (pdfName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Si no hay coincidencia, retornar el nombre original
  return pdfName;
}

export function mapPDFToExcelRows(pdfData: PDFReportData): ExcelRow[] {
  const rows: ExcelRow[] = [];

  for (const microorg of pdfData.microorganismos) {
    const mappedName = mapMicroorganismoName(microorg.microorganismo);

    const row: ExcelRow = {
      "Código de Orden": pdfData.codigoMuestra,
      "Laboratorio": pdfData.laboratorio,
      "Fecha Recepción Muestra": pdfData.fechaRecepcion,
      "Fecha Emisión de Informe": pdfData.fechaAnalisis,
      "Subtipo de Análisis": pdfData.subtipoAnalisis,
      "Microorganismo": mappedName,
      "Resultado": microorg.resultado,
      "CT": microorg.ct || "",
      "Cuantificación Bacteriana": microorg.copias || "",
      "Unidad de Medida": "copias/μl",
    };

    rows.push(row);
  }

  return rows;
}

export function loadCustomNameMapping(csvText: string): { [key: string]: string } {
  const mapping: { [key: string]: string } = { ...nameMapping };
  const lines = csvText.split(/[\n\r]+/).slice(1); // Skip header

  for (const line of lines) {
    const [pdfName, excelName] = line.split(",").map((s) => s.trim());
    if (pdfName && excelName) {
      mapping[pdfName] = excelName;
    }
  }

  return mapping;
}
