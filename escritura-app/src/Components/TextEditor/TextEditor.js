import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import ReactDOMServer from 'react-dom/server';


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

  function Html() {
    return (
      <>
        <div className="bar-container"></div>
        <div className="center-div">
          <div className="side-holder left"></div>
          <div className="editor"></div>
          <div className="side-holder right">
            <div className="bubble-comment-holder">

            </div>
          </div>
        </div>
      </>
    );
  }

  const reference = useCallback((refe) => {
    if (refe == null) return;

    refe.innerHTML = ReactDOMServer.renderToString(<Html />);

    const editor = refe.querySelector('.editor');

    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': toolBar
      }
    });
    var toolbar = document.querySelector('.ql-toolbar');
    refe.querySelector('.bar-container').appendChild(toolbar);
    setQuill(quill);
  }, []);

  //Recojo datos del servidor
  useEffect(() => {
    console.log(documentId);
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
  useEffect(() => {
    const interval = setInterval(async () => {
      setIsLoading(true);
      if (quill == null) return;
      const docuData = { "id": documentId, "privateText": quill.root.innerHTML };
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

  return <div className="container" ref={reference}></div>;
};
