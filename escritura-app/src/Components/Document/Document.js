import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import '../../Views/TextEditor/TextEditor.css';
import documentService from '../../Services/DocumentService'
import ReadingService from "../../Services/ReadingService";

export default function Document() {
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const scrollPositionRef = useRef(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    scrollPositionRef.current = position;
    console.log(position);
  };

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

  //Recibo datos al iniciar Quill.
  useEffect(() => {
    console.log("inicio");
    if (quill != null) {
      console.log("GETTING DATA");
      documentService.getDocumentById(documentId).then(data => {
        quill.root.innerHTML = data.privateText;
        ReadingService.getReading(data.id).then(result => {
          if (result == null) {
            ReadingService.postReading(data.id);
          } else {
            window.scrollTo(0, result.readingSpot);
          }
        });
      });
    }
  }, [quill]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("enviando: " + scrollPositionRef.current);
      ReadingService.putReading(documentId, scrollPositionRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return <div className="container" ref={reference}></div>;
};
