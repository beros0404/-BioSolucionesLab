import * as XLSX from "xlsx";
import { ExcelRow } from "./types/pdf-data";

export function generateExcelBuffer(rows: ExcelRow[]): Buffer {
  // Crear workbook con los datos
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: [
      "Código de Orden",
      "Laboratorio",
      "Fecha Recepción Muestra",
      "Fecha Emisión de Informe",
      "Subtipo de Análisis",
      "Microorganismo",
      "Resultado",
      "CT",
      "Cuantificación Bacteriana",
      "Unidad de Medida",
    ],
  });

  // Configurar ancho de columnas
  worksheet["!cols"] = [
    { wch: 15 }, // Código de Orden
    { wch: 18 }, // Laboratorio
    { wch: 20 }, // Fecha Recepción Muestra
    { wch: 20 }, // Fecha Emisión de Informe
    { wch: 25 }, // Subtipo de Análisis
    { wch: 30 }, // Microorganismo
    { wch: 15 }, // Resultado
    { wch: 10 }, // CT
    { wch: 25 }, // Cuantificación Bacteriana
    { wch: 15 }, // Unidad de Medida
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");

  // Convertir a buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer as Buffer;
}

export function generateMultipleExcelBuffer(
  allRows: ExcelRow[],
  fileName: string = "Reporte_BioSoluciones"
): Buffer {
  // Crear workbook con todos los datos
  const worksheet = XLSX.utils.json_to_sheet(allRows, {
    header: [
      "Código de Orden",
      "Laboratorio",
      "Fecha Recepción Muestra",
      "Fecha Emisión de Informe",
      "Subtipo de Análisis",
      "Microorganismo",
      "Resultado",
      "CT",
      "Cuantificación Bacteriana",
      "Unidad de Medida",
    ],
  });

  // Configurar ancho de columnas
  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 18 },
    { wch: 20 },
    { wch: 20 },
    { wch: 25 },
    { wch: 30 },
    { wch: 15 },
    { wch: 10 },
    { wch: 25 },
    { wch: 15 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");

  // Convertir a buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer as Buffer;
}
