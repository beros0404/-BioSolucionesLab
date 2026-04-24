export interface PDFReportData {
  codigoMuestra: string;
  laboratorio: string;
  fechaRecepcion: string;
  fechaAnalisis: string;
  subtipoAnalisis: string;
  microorganismos: MicroorganismoResult[];
}

export interface MicroorganismoResult {
  microorganismo: string;
  resultado: string;
  ct?: string;
  copias?: string;
  unidadMedida: string;
}

export interface ExcelRow {
  "Código de Orden": string;
  "Laboratorio": string;
  "Fecha Recepción Muestra": string;
  "Fecha Emisión de Informe": string;
  "Subtipo de Análisis": string;
  "Microorganismo": string;
  "Resultado": string;
  "CT": string;
  "Cuantificación Bacteriana": string;
  "Unidad de Medida": string;
}

export interface NameMapping {
  "Nombre PDF": string;
  "Nombre Excel": string;
}
