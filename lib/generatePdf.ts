import { jsPDF,HTMLOptionImage } from "jspdf";
import { toPng,toCanvas } from "html-to-image";
import { ReactElement, useRef } from "react";
import LayoutPdf from "../src/layoutPdf";
import { renderToString,renderToStaticMarkup  } from 'react-dom/server';


interface ISizeImg{
  width?: number,
  height?: number
}

export const generatePdfByImage = async (layout:any) => {
    try {
     
      const div = document.createElement('div');
      const htmlstr = renderToStaticMarkup (layout);
      div.innerHTML = htmlstr;
      document.body.appendChild(div);

      const htmlPag1:HTMLElement = div.querySelector(".Box-Email") as HTMLElement;  
      const htmlPag2:HTMLElement = div.querySelector(".Box-Email-Translated") as HTMLElement;  

      const imgPag1 = await toPng(htmlPag1,{quality:1});
      const imgPag2 = await toPng(htmlPag2,{quality:1});
      document.body.removeChild(div);

      //let i = new Image();
      let width = 200;
      let height = 220;
      const doc = new jsPDF({orientation:"p",compress:true});

      doc.addImage(imgPag1,'PNG', 5, 10, width, height);
      doc.addPage();
      doc.addImage(imgPag2,'PNG', 5, 10, width, height);

      //const file = doc.save();//TESTE DOWNLOAD PDF

      return doc.output('datauristring')//RETURN ONLY BASE64 (data uri string) PDF
    } catch (error) {
      console.log("AAAhhhhhhh",error)
    }
}


