import nodemailer from 'nodemailer';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';

function Testmail() {
  const [pdf, setPdf] = useState(null);
  const email = process.env.EMAIL
  const pass = process.env.EMAIL_PASS
  useEffect(() => {
    const doc = new jsPDF();
    doc.text('Exemplo de PDF em memória', 20, 20);
    setPdf(doc.output('datauristring'));
  }, []);

  const handleSendEmail = async () => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: pass,
      },
    });

    const mailOptions = {
      from: email,
      to: 'inacioregisneto@gmail.com',
      subject: 'Assunto do email',
      html: '<p>Conteúdo do email em HTML</p>',
      attachments: [
        {
          filename: 'exemplo.pdf',
          content: pdf.split(';base64,').pop(),
          encoding: 'base64',
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
    } catch (error) {
      console.log('Erro ao enviar o email: ' + error);
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Enviar email</button>
    </div>
  );
}

export default Testmail;