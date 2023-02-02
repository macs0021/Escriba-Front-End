import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';


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

    leftDiv.className = "side-holder right";
    rightDiv.className = "side-holder left";
    centerDiv.className = "center-div";

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

   useEffect(() => {
    console.log("Pidiendo " + documentId);
    fetch(`http://localhost:8080/api/documents/${encodeURIComponent(documentId)}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data.privateText);
        if (quill != null) {
          quill.root.innerHTML = data.privateText;
        }
      });
  }, [quill]);

  //Enviando datos cada 5s
  /*useEffect(() => {
    const interval = setInterval(async () => {
      setIsLoading(true);
      if (quill == null) return;
      const docuData = { "id": documentId, "text": quill.root.innerHTML };
      console.log("enviando datos: " + quill.root.innerHTML);
      const options = {
        method: 'POST',
        body: JSON.stringify(docuData),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await fetch('http://localhost:8080/api/documents', options);
        const result = await response.json();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [quill]);*/

  return <div className="container" ref={reference}></div>;
};
