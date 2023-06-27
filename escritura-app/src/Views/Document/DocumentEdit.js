import React, { useCallback, useEffect, useState, useRef } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import './Document.css';
import { putDocument, getDocumentById } from "../../Services/DocumentService";
import ImageGeneratorForm from "../../Components/ImageGeneratorForm/ImageGeneratorForm";

import ImageResize from 'quill-image-resize-module-react';
import { generateImage } from "../../Services/ImageGeneratorService";
import { getUsername } from "../../Services/TokenService";
import loadingImg from '../../files/cargaV3.gif'
import { v4 as uuidv4 } from 'uuid';

import PasteClipboard from 'ngx-quill-paste'

Quill.register('modules/clipboard', PasteClipboard)
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

export default function DocumentEdit() {
  const [quill, setQuill] = useState();
  const [docuData, setDocuData] = useState();
  const { id: documentId } = useParams();
  const [lastSelection, setLastSelection] = useState(0);
  const [isTablet, setIsTablet] = useState(window.matchMedia("(max-width: 1500px)").matches);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 760px)").matches);
  const editorRef = useRef();
  const scrollingContainerRef = useRef();

  const toolbarConfig = isMobile ? toolbarMobile : toolbarDesktop;

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.matchMedia("(max-width: 1500px)").matches);
      setIsMobile(window.matchMedia("(max-width: 760px)").matches);
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
    editorRef.current = editor;
    refe.append(editor);

    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': toolbarConfig,
        imageResize: {
          modules: ['Resize']
        }
      },
      scrollingContainer: scrollingContainerRef.current,
    });

    quill.on('editor-change', () => {
      if (quill.getSelection() != null)
        setLastSelection(quill.getSelection().index);

    });

    quill.container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        setTimeout(() => {
          let editor = document.querySelector('.ql-editor');
          editor.scrollTop += 20;  // Asume que la altura de la línea es de 20px.
        }, 1);
      }
    });

    setQuill(quill);
  }, [toolbarConfig]);

  // Recojo datos del servidor
  useEffect(() => {
    if (quill != null) {
      getDocumentById(documentId).then(data => {
        quill.root.innerHTML = data.text;
        setDocuData(data);
      });
    }
  }, [quill, documentId]);

  // Enviando datos cada 5s
  useEffect(() => {
    const interval = setInterval(async () => {
      if (quill == null) return;

      const document = {
        "id": documentId,
        "text": quill.root.innerHTML,
        "cover": docuData.cover,
        "tittle": docuData.tittle,
        "synopsis": docuData.synopsis,
        "creatorUsername": getUsername(),
        "genres": docuData.genres,
        "savedBy": docuData.savedBy,
        "readings": docuData.readings,
      };

      putDocument(documentId, document);

    }, 5000);
    return () => clearInterval(interval);
  }, [quill, docuData, toolbarConfig, documentId]);

  const handleButtonClick = ({ imagePrompt, width, height }) => {
    
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

    // Busco la posicion donde insertar la imagen
    const index = lastSelection;

    // Inserto la imagen con el elemento de carga
    quill.insertEmbed(index, 'image', loadingImg);

    // Busco la imagen insertada
    let img = quill.container.querySelector(`img[src="${loadingImg}"]`);

    const uuid = uuidv4();

    // Le coloco un id para buscarla
    img.setAttribute('id', 'mi-imagen' + uuid);

    // Le aplico el tamaño que se necesita
    img.width = width;
    img.className = 'loading-img';
    img.style.aspectRatio = `${width} / ${height}`;
    img.style.shapeOutside = 'content-box';

    generateImage(imgData).then(data => {
      // Obtengo el src de la imagen
      const base64Image = data.images[0];

      // Busco la imagen
      let miImagen = document.getElementById('mi-imagen' + uuid);

      // Le pongo el src y le quito la clase de estilos
      miImagen.src = `data:image/png;base64,${base64Image}`;
      miImagen.className = "";
    });
  };

  return (
    <>
      <div className="container" ref={reference}></div>
      <ImageGeneratorForm execute={handleButtonClick} isMobile={isTablet}></ImageGeneratorForm>
      <div ref={scrollingContainerRef} style={{ overflowY: 'auto', maxHeight: '500px' }}></div>
    </>
  );
};