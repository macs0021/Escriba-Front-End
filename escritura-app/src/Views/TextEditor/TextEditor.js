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


Quill.register('modules/imageResize', ImageResize);

export default function TextEditor() {

  const [quill, setQuill] = useState();
  const [docuData, setDocuData] = useState();
  const { id: documentId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [lastSelection, setLastSelection] = useState(0);
  const [actualImage, setActualImage] = useState(null);


  const toolBar = {
    container: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'margin': [10, 20, 30, 40] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'super' }, { 'script': 'sub' }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['direction', { 'align': [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
      ['divider'],
    ]
  }


  const reference = useCallback((refe) => {
    if (refe == null) return;
    refe.innerHTML = "";

    const editor = document.createElement("div");

    refe.append(editor);

    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': toolBar,
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
  }, []);

  //Recojo datos del servidor
  useEffect(() => {
    if (quill != null) {
      documentService.getDocumentById(documentId).then(data => {
        quill.root.innerHTML = data.privateText;
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
        "privateText": quill.root.innerHTML,
        "cover": docuData.cover,
        "tittle": docuData.tittle,
        "synopsis": docuData.synopsis,
        "creatorUsername": TokenService.getUsername()
      };

      console.log("enviando datos: " + quill.root.innerHTML);

      documentService.putDocument(document).then(data => {
        setIsLoading(false);
      })

    }, 5000);
    return () => clearInterval(interval);
  }, [quill, docuData]);

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
    ImageGeneratorService.postImg(imgData).then(data => {
      console.log(data.images[0]);
      const base64Image = data.images[0];
      const index = lastSelection;
      setActualImage(quill.insertEmbed(index, 'image', `data:image/png;base64,${base64Image}`));
      console.log(actualImage);
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
    <ImageGeneratorForm execute={handleButtonClick} reload={reloadOnButtonClick}></ImageGeneratorForm>
  </>);
};
