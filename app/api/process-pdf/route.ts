import { NextRequest, NextResponse } from "next/server";
import { parsePDFFile } from "@/lib/pdf-parser";
import { mapPDFToExcelRows } from "@/lib/data-mapper";
import { generateMultipleExcelBuffer } from "@/lib/excel-generator";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const allExcelRows = [];

    // Procesar cada PDF
    for (const file of files) {
      try {
        const buffer = await file.arrayBuffer();
        const pdfData = await parsePDFFile(Buffer.from(buffer));

        if (!pdfData) {
          console.warn(`[v0] Failed to parse PDF: ${file.name}`);
          continue;
        }

        // Mapear datos a formato Excel
        const excelRows = mapPDFToExcelRows(pdfData);
        allExcelRows.push(...excelRows);

        console.log(
          `[v0] Successfully processed: ${file.name} with ${excelRows.length} rows`
        );
      } catch (fileError) {
        console.error(`[v0] Error processing file ${file.name}:`, fileError);
        continue;
      }
    }

    if (allExcelRows.length === 0) {
      return NextResponse.json(
        { error: "No data extracted from PDFs" },
        { status: 400 }
      );
    }

    // Generar Excel
    const excelBuffer = generateMultipleExcelBuffer(allExcelRows);

    // Retornar Excel como descarga
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          `attachment; filename="Reporte_BioSoluciones_${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("[v0] API error:", error);
    return NextResponse.json(
      { error: "Failed to process PDFs" },
      { status: 500 }
    );
  }
}
