import sendgrid from "@sendgrid/mail";
import { useTranslation } from "react-i18next";
import { Buffer } from 'buffer';
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
import {htmlLayout} from "../../email";
import { transporter, mailOptions } from "../../../config/nodemailer";
import jsPDF from 'jspdf';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';

import concat from 'concat-stream'

import { Base64Encode } from 'base64-stream'
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

const streamToBase64 = (stream) => {
  

  return new Promise((resolve, reject) => {
    const base64 = new Base64Encode()

    const cbConcat = (base64) => {
      resolve(base64)
    }

    stream
      .pipe(base64)
      .pipe(concat(cbConcat))
      .on('error', (error) => {
        reject(error)
      })
  })
}

const generatePdfFromHtml = async (html) => {
  console.log('Generating PDF from HTML')
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  // Define o conteúdo da página com o HTML recebido
  await page.setContent(html);
  await page.waitForFunction(() => {
    const element = document.querySelector('img');
    return element !== null;
  });
  // Gera o PDF a partir do conteúdo da página
  const pdfStream = await page.pdf({ format: 'A4',border: {top: '50cm',right: '50cm',bottom: '50cm',left: '50cm'}});

  // let buffer = new Buffer.from(pdfStream, 'base64')
  // return buffer.toString('base64')
  // Converte o buffer do PDF para uma stream legível
  
  // const pdfReadableStream = new Readable();
  // pdfReadableStream.push(pdfStream);
  // pdfReadableStream.push(null);
  // let stb64 =  pdfReadableStream
  // let stb64 = await streamToBase64(pdfReadableStream)
  
  let stb64 =  pdfStream.toString('base64')
  await browser.close();
  return stb64;
};


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
    if (!body.employeeName) {return res.status(400).json({ message: "Bad requesto" });}
    
    
    
    try {
      const emailContent = generateEmailContent(body);
      const content = await generatePdfFromHtml(emailContent.html);
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    
      const msg = {
        to: 'jacobathias.stm@gmail.com',
        from: 'jacobathias.stm@gmail.com',
        subject: `Witness Statement - ${body.employeeName}`,
        text: 'Hermes Statement',
        html: emailContent.html,
        attachments: [
          {
            content: content,
            filename: `Incident Statement - ${body.employeeName}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment',
            encoding: 'base64',
          },
        ],
      };
    
      await sendgrid.send(msg);
      console.log('Email sent UHAAA');
      return res.status(200).json({ message: 'Sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Caramba' + error });
    }
  } 
};

export default handler;
