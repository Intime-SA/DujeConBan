import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";

function convertObjectToPdf(dataObject) {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("Datos del objeto", 105, 10, { align: "center" });

  const tableData = dataObject.map((item, index) => [
    index + 1,
    JSON.stringify(item),
  ]);
  doc.autoTable({
    startY: 20,
    head: [["#", "Datos"]],
    body: tableData,
  });

  doc.save("archivo.pdf");
}

function PdfConversion({ dataJson }) {
  // Objeto (o array) que deseas convertir a PDF
  const dataObject = dataJson;

  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => convertObjectToPdf(dataObject)}
    >
      Generar PDF
    </Button>
  );
}

export default PdfConversion;
