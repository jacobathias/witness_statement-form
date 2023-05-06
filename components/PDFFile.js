import { jsPDF } from "jspdf";

const doc = new jsPDF();

export async function generatePDF() {
  console.log("Gerando PDF");
  doc.text("Hello world!", 10, 10);
    // doc.save   ("a4.pdf");
  return doc.output("arraybuffer");
}
