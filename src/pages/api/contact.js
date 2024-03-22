import sendgrid from "@sendgrid/mail";
import chromium from 'chrome-aws-lambda';
import { useTranslation } from "react-i18next";
import { Buffer } from 'buffer';
import {
  Affirm,
  DateOfIncident,
  DateSigned,
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
import {HtmlEmailLayout} from "../../layoutEmail";

import { renderToString } from 'react-dom/server';

import concat from 'concat-stream'

const generateEmailContent = (data) => {
  console.log('Generating Email Content')
  const htmlLayout = renderToString(<HtmlEmailLayout data={data} />);
  return {
    text: 'stringData',
    html: htmlLayout
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
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
      console.log(body.to)

      const msg = {
        to: body.to,
        from: 'jacobathias.stm@gmail.com',
        subject: `Incident Statement - ${body.employeeName}`,
        text: 'Hermes Statement',
        html: emailContent.html,
        attachments: [
          {
            content: body?.pdf.split(',')[1],
            filename: `${body.employeeName} - IS.pdf`,
            type: 'application/pdf',
            disposition: 'attachment',
            encoding: 'base64',
          },
        ],
      };
    
      await sendgrid.send(msg);
      console.log('Email sent UHAAAaaaaa');
      return res.status(200).json({ message: 'Sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Caramba::::' + error });
    }
  } 
};

export default handler;


