import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import '../../Views/TextEditor/TextEditor.css';
import documentService from '../../Services/DocumentService'

export default function Document() {
  const [port, setPort] = useState();
  const [quill, setQuill] = useState();
  const [data, setData] = useState();
  const { id: documentId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const reference = useCallback((refe) => {
    if (refe == null) return;

    refe.innerHTML = "";

    const leftDiv = document.createElement('div');
    const editor = document.createElement('div');
    const centerDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const barContaier = document.createElement('div');

    leftDiv.className = "side-holder-reader right";
    rightDiv.className = "side-holder-reader left";
    centerDiv.className = "center-div-reader";

    centerDiv.appendChild(leftDiv);
    centerDiv.appendChild(editor);
    centerDiv.appendChild(rightDiv);
    refe.append(barContaier);
    refe.append(centerDiv);

    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': false
      },
      readOnly: true,
    });
    
    setQuill(quill);
  }, []);

  //Recibo datos al inicial Quill.
  useEffect(() => {
    if (quill != null) {
      documentService.getDocumentById(documentId).then(data => {
        quill.root.innerHTML = data.privateText;
      });
    }
  }, [quill]);

  
  return <div className="container" ref={reference}></div>;
};
