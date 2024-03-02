import React, { useState } from "react";
import { jsPDF,HTMLOptionImage } from "jspdf";
import { toPng,toCanvas } from "html-to-image";

interface props {
  html:HTMLElement
}

interface ISizeImg{
  width?: number,
  height?: number
}

const GeneratePdf = ({ html }:props) => {

  //const [sizeImg,setSizeImg] = useState<ISizeImg>({});

  /**
   * - usar essa função no submit do formulario
   * - pegar a assinatura ali
   * - enviar o file junto no submit para o disparo de email
   */
   const generateImage=async ()=>{
    debugger;
    let teste = document.querySelector(".Box-Email") as HTMLElement;  
    console.log("%%%%%%%%%%%%%%%%%%%%%%% GERANDO PDF IMG %%%%%%%%%%%%%%%%%%%%%%%%%");
    const image = await toPng(teste,{quality:1});
    let i = new Image();
    let width = 0;
    let height = 0;

    i.onload = function(){
      debugger;
      var dpi = 105; // DPI padrão para telas de computador
      width = (i.width/dpi * 25.4 ) as number; // 1 inch = 25.4 mm
      height = (i.height/dpi * 25.4) as number; // 1 inch = 25.4 mm

      const doc = new jsPDF({orientation:"p",compress:true});
      //console.log(image)
      debugger;
      doc.addImage(i,'PNG', 5, 10, width, height);
      //mm
      //doc.addImage(assinatura,'PNG',5,22, 200, 200);
      // console.log("=====>",doc.output())
      const file = doc.save();
    };

    i.src = image;

   

  }
  return (

    <div className="button-container">
        <button onClick={generateImage}>
        Download PDF
      </button>
    </div>

  );
};

export default GeneratePdf;