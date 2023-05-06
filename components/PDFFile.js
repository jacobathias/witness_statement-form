import { LoadingButton } from "@mui/lab";
import { jsPDF } from "jspdf";

const doc = new jsPDF();

export function generatePDF()  {
  console.log("Gerando PDF");
  doc.text   ("Hello world!", 10, 10);
  const pdf = doc.output("blob");
  doc.save   ("a4.pdf");
  console.log(pdf)
  return pdf;
}
// export default function PDFFile() {
//   return (
//     <LoadingButton variant="contained" onClick={(e) => generatePDF()}>
//       PDFFFF
//     </LoadingButton>
//   );
// }
