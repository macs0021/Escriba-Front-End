import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import './TextEditor.css';
import 'quill-divider';


export default function TextEditor() {
  const [port, setPort] = useState();
  const [quill, setQuill] = useState();
  const [data, setData] = useState();
  const { id: documentId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

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

    const editor = document.createElement('div');
    refe.append(editor);
    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': toolBar,
        divider: {
          className: 'page-divider'
        }
      }
    });


    //Hacer que la vista siga al punto de escritura
    const MARGIN_TOP = 10;
    const MARGIN_BOT = 0;
    quill.on('editor-change', function () {

      const range = quill.getSelection();

      console.log("Rango " + JSON.stringify(range));
      

      if (range) {

        const cursorBounds = quill.getBounds(range.index);
        const cursorNode = document.elementFromPoint(cursorBounds.left, cursorBounds.top);

        const rect = cursorNode.getBoundingClientRect();

        const distanceFromTop = Math.abs(cursorBounds.top);
        console.log("valor de top: " + cursorBounds);

        {/*if (rect.top < MARGIN_TOP || rect.bottom > (window.innerHeight || document.documentElement.clientHeight) - MARGIN_BOT) {
          cursorNode.scrollIntoView({ behavior: 'auto', block: 'center' });
        }*/}
      }
    });


    setQuill(quill);
  }, []);


  {/* useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte y cuando cambie el estado de data
    // Si quieres que se ejecute solo cuando el componente se monte, puedes pasar un segundo argumento vacío [] a useEffect
    console.log(documentId);
    fetch(`http://localhost:8080/api/documents/${encodeURIComponent(documentId)}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data.text);
        if (quill != null) {
          quill.root.innerHTML = data.text;
        }
      });
  }, [quill]);

  //Enviando datos cada 5s
  useEffect(() => {
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
  }, [quill]);
*/}
  return <div className="container" ref={reference}></div>;
};
