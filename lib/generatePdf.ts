import { jsPDF,HTMLOptionImage } from "jspdf";
import { toPng,toCanvas } from "html-to-image";
import { ReactElement, useRef } from "react";
import LayoutPdf from "../src/layoutPdf";
import { renderToString,renderToStaticMarkup  } from 'react-dom/server';


interface ISizeImg{
  width?: number,
  height?: number
}

export const generatePdfByImage = async (layout:any, language: any) => {
    try {
     
      const div = document.createElement('div');
      const htmlstr = renderToStaticMarkup (layout);
      div.innerHTML = htmlstr;
      document.body.appendChild(div);
      console.log(language)
      
      // layout
      
      const htmlPag1:HTMLElement = div.querySelector(".Box-Email") as HTMLElement;  
      const imgPag1 = await toPng(htmlPag1,{quality:1});
      let imgPag2 ='null' 
      if (language != 'en'){
        const htmlPag2:HTMLElement = div.querySelector(".Box-Email-Translated") as HTMLElement;  
        imgPag2 = await toPng(htmlPag2,{quality:1});
      }

      document.body.removeChild(div);
      
      const width = 200;
      const height = 220;
      const doc = new jsPDF({orientation:"p",compress:true});
      
      doc.addImage(imgPag1,'PNG', 5, 10, width, height);
      if (language != 'en'){ 
        doc.addPage();
        doc.addImage(imgPag2,'PNG', 5, 10, width, height);
      }
        
      
      
      //const file = doc.save();//TESTE DOWNLOAD PDF
      
      
      return doc.output('datauristring')//RETURN ONLY BASE64 (data uri string) PDF
    } catch (error) {
      console.log("Error",error)
    }
}


