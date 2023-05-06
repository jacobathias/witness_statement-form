import { jsPDF } from "jspdf";

const doc = new jsPDF();

export function generatePDF() {
  console.log("Gerando PDF");
  doc.text("Hello world!", 10, 10);
    // doc.save   ("a4.pdf");
  console.log(doc.output("arraybuffer"));
  return doc.output("arraybuffer");
}
