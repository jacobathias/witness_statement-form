import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";


export default async function handler(req, res) {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY );
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  
  let teste = fs.readFileSync('C:\\Users\\jacob\\Documents\\GitHub\\witness_statement-form\\src\\pages\\api\\pdf.pdf').toString('base64')
  // console.log(teste)
  const msg = {
    to: "jacobathias.stm@gmail.com", // Change to your recipient
    from: "jacobathias.stm@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    attachments: [
      {
        content:teste,
        filename: `Incident Statement - testandoATesta.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
        encoding: 'base64',
      },
    ],
  };
  

  sendgrid
    .send(msg)
    .then(() => {
      console.log("Email sent UHAAA");
    })
    .catch((error) => {
      console.error(error);
    });
}
