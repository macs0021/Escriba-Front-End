import React, { useCallback, useEffect, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill, Delta } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import ReactDOMServer from 'react-dom/server';
import './TextEditor.css';
import documentService from '../../Services/DocumentService'
import ImageGeneratorForm from "../../Components/TextEditor/ImageGeneratorForm";

import ImageResize from 'quill-image-resize-module-react';
import { textAlign } from "@mui/system";
import ImageGeneratorService from '../../Services/ImageGeneratorService';
import TokenService from "../../Services/TokenService";
import loadingImg from '../../files/cargaV3.gif'


Quill.register('modules/imageResize', ImageResize);

const toolbarDesktop = {
  container: [
    [{ 'font': [] }, { 'size': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['direction', { 'align': [] }],
    ['link', 'image', 'video'],
  ]
}

const toolbarMobile = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
];

function getToolbarConfig() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  return isMobile ? toolbarMobile : toolbarDesktop;
}

export default function TextEditor() {

  const [quill, setQuill] = useState();
  const [docuData, setDocuData] = useState();
  const { id: documentId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [lastSelection, setLastSelection] = useState(0);
  const [actualImage, setActualImage] = useState(null);

  const [toolbarConfig, setToolbarConfig] = useState(getToolbarConfig());


  useEffect(() => {
    const handleResize = () => {
      setToolbarConfig(getToolbarConfig());
      console.log(getToolbarConfig());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const reference = useCallback((refe) => {
    if (refe == null) return;
    refe.innerHTML = "";

    const editor = document.createElement("div");

    refe.append(editor);

    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': toolbarConfig,
        imageResize: {
          modules: ['Resize']
        }
      }
    });

    quill.on('editor-change', () => {
      if (quill.getSelection() != null)
        setLastSelection(quill.getSelection().index);

    });

    setQuill(quill);
  }, [toolbarConfig]);

  //Recojo datos del servidor
  useEffect(() => {
    if (quill != null) {
      documentService.getDocumentById(documentId).then(data => {
        quill.root.innerHTML = data.text;
        setDocuData(data);
      });
    }
  }, [quill]);

  //Enviando datos cada 5s
  useEffect(() => {
    const interval = setInterval(async () => {
      setIsLoading(true);

      if (quill == null) return;

      const document = {
        "id": documentId,
        "text": quill.root.innerHTML,
        "cover": docuData.cover,
        "tittle": docuData.tittle,
        "synopsis": docuData.synopsis,
        "creatorUsername": TokenService.getUsername(),
        "genres": docuData.genres,
        "savedBy": docuData.savedBy,
        "readings": docuData.readings,
      };

      console.log("enviando datos: " + quill.root.innerHTML);

      documentService.putDocument(documentId, document).then(data => {
        setIsLoading(false);
      })

    }, 5000);
    return () => clearInterval(interval);
  }, [quill, docuData, toolbarConfig]);

  const handleButtonClick = ({ imagePrompt, width, height }) => {

    console.log("prompt: " + imagePrompt);
    console.log("width: " + width);
    console.log("height: " + height);

    const seed = Math.floor(Math.random() * 999999) + 1;

    const imgData = {
      "prompt": imagePrompt,
      "negative_prompt": "string",
      "scheduler": "EulerAncestralDiscreteScheduler",
      "image_height": height,
      "image_width": width,
      "num_images": 1,
      "guidance_scale": 7,
      "steps": 50,
      "seed": seed,
    }

    //Busco la posicion donde insertar la imagen
    const index = lastSelection;

    //Inserto la imagen con el elemento de carga
    quill.insertEmbed(index, 'image', loadingImg);

    //Busco la imagen insertada
    let img = quill.container.querySelector(`img[src="${loadingImg}"]`);

    //Le coloco un id para buscarla
    img.setAttribute('id', 'mi-imagen');

    //Le aplico el tamaño que se necesita
    img.width = width;
    img.className = 'loading-img';
    img.style.aspectRatio = `${width} / ${height}`;
    img.style.shapeOutside = 'content-box';

    ImageGeneratorService.postImg(imgData).then(data => {
      //Obtengo el src de la imagen
      const base64Image = data.images[0];

      //Busco la imagen
      let miImagen = document.getElementById('mi-imagen');

      //Le pongo el src y le quito la clase de estilos
      miImagen.src = `data:image/png;base64,${base64Image}`;
      miImagen.className = "";
    })
  };

  const reloadOnButtonClick = ({ imagePrompt, width, height }) => {
    if (actualImage == null) return;

    const imgData = {
      "prompt": imagePrompt,
      "negative_prompt": "string",
      "scheduler": "EulerAncestralDiscreteScheduler",
      "image_height": height,
      "image_width": width,
      "num_images": 1,
      "guidance_scale": 7,
      "steps": 50,
      "seed": Math.floor(Math.random() * 999999) + 1
    }
    ImageGeneratorService.postImg(imgData).then(data => {
      console.log(data.images[0]);
      if (actualImage == null) return;
      const base64Image = data.images[0];
      quill.updateEmbed(actualImage, { src: `data:image/png;base64,${base64Image}` });
    })
  };


  return (<>
    <div className="container" ref={reference}></div>
  </>);
};
