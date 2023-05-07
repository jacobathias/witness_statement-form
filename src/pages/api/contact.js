import { useTranslation } from "react-i18next";
import {
  Affirm,
  DateOfIncident,
  DateSigned,
  DescribeTheWork,
  EmployeeName,
  IndicateWhichPart,
  PersonalNumber,
  PleaseDescribe,
  SafetyRuleViolated,
  Signature,
  SiteLocation,
  Srs,
  SupEmail,
  SupTelephone,
  SupervisorName,
  TimeOfIncident,
  ToAvoid,
  WitnessEmployeeData,
  WorkingTitle,
  safetyRuleViolated,
} from "../../../Languages/English";
import {htmlLayout} from "../email";
import { transporter, mailOptions } from "../../../config/nodemailer";
import jsPDF from 'jspdf';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';

const WITNESS_FIELDS = {
  employeeName: EmployeeName,
  workingTitle: WorkingTitle,
  personalNumber: PersonalNumber,
  siteLocation: SiteLocation,
  supervisorName: SupervisorName,
  supTelephone: SupTelephone,
  supEmail: SupEmail,
  pleaseDescribe: PleaseDescribe, 
  describeTheWork: DescribeTheWork,
  indicateWhichPart: IndicateWhichPart,
  toAvoid: ToAvoid,
  safetyRuleViolated: SafetyRuleViolated,

  // affirm: Affirm,

  // signature: Signature,
  // dateSigned: DateSigned,
  // add with spread ops
  dateOfIncident: DateOfIncident,
  timeOfIncident: TimeOfIncident,
  to: "",
  Translation: "",
};


const generatePdfFromHtml = async (html) => {
  console.log('Generating PDF from HTML')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Define o conteúdo da página com o HTML recebido
  await page.setContent(html);

  // Gera o PDF a partir do conteúdo da página
  const pdfStream = await page.pdf({ 
    format: 'A4',
    border: {
      top: '50cm',
      right: '50cm',
      bottom: '50cm',
      left: '50cm',
    },
  });

  await browser.close();

  // Converte o buffer do PDF para uma stream legível
  const pdfReadableStream = new Readable();
  pdfReadableStream.push(pdfStream);
  pdfReadableStream.push(null);

  return pdfReadableStream;
};

// const generateEmailContent = (data) => {
//   // CAMPOS
//   const stringData = Object.entries(data).reduce(
//     (str, [key, val]) => (str += `${WITNESS_FIELDS[key]}: ${val}} `),
//     ""
//   );
//   console.log(stringData);
//   // VALORES
//   const htmlData = Object.entries(data).reduce((str, [key, val]) => {
//     return (str += `<h3 >${WITNESS_FIELDS[key]}</h3>${val}`);
//   }, "");

//   return {
//     text: stringData,
//     html: `<div class="form-container">${htmlData}</div>`,
//   };
// };
const generateEmailContent = (data) => {
  console.log('Generating Email Content')
return {
  text: 'stringData',
  html: htmlLayout(data)
      }
};

const handler = async (req, res) => {
  console.log('Getting response from POST')
  let body = "";
  if (req.method === "POST") {
    body = req.body;
    console.log(body.name);
    if (!body.employeeName) {
      return res.status(400).json({ message: "Bad requesto" });
    }


    // const doc = new jsPDF();
    // doc.text('TESTE', 20, 20);
    // var pdf = (doc.output('datauristring'));
    //var content = pdf.split(';base64,').pop();


    try {

      const emailContent = generateEmailContent(body)

      const content = await generatePdfFromHtml(emailContent.html);

      const newMailOption = {
        ...mailOptions,
        to: body.to,
        attachments: [
          {
            filename: `Incident Statement - ${body.employeeName}.pdf`,
            content,
            encoding: 'base64',
          },
        ],
 
      };
      await transporter.sendMail({
        ...newMailOption,
        ...emailContent,
        subject: `Witness Statement - ${body.employeeName}`,
      });
      console.log("Email Sent");
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: "Sucesso" });
  }

  return res.status(400).json({ message: 'Falha na requisição' });
};

export default handler;
