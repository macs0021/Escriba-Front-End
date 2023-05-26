import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import '../../Views/TextEditor/TextEditor.css';
import documentService from '../../Services/DocumentService'
import ReadingService from "../../Services/ReadingService";
import AutoScroll from "../AutoScroll/AutoScroll";

export default function Document() {
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const scrollPositionRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleScroll = () => {
    const position = window.pageYOffset;
    scrollPositionRef.current = position;
    console.log(position);
  };

  const getWordAtIndex = (content, index) => {
    const length = content.length;
    let start = index;
    let end = index;

    console.log(content);

    if (isSeparator(content[index])) {
      return "";
    }

    while (start > 0 && !isSeparator(content[start - 1])) {
      start--;
    }

    while (end < length && !isSeparator(content[end])) {
      end++;
    }

    const word = content.substring(start, end);

    return word;
  };

  const isSeparator = (char) => {

    const separators = [" ", ".", ",", ";", "\n", "!", "¡", "-", "?", "¿"];
    return separators.includes(char);
  };

  const handleWordIndexChange = (index) => {
    setSelectedIndex(index);
    if (quill !== null) {
      const content = quill.getText();
      const word = getWordAtIndex(content, index);
      console.log("Palabra: " + word)
    }
  };

  const handleSelectionChange = useCallback(() => {
    if (quill && quill.getSelection) {
      const range = quill.getSelection();
      if (range) {
        if (range.length === 0) {
          console.log('User cursor is at index', range.index);
          handleWordIndexChange(range.index);

        } else {

        }
      } else {
        console.log('User cursor is not in editor');
      }
    }
  }, [quill]);

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

    const quillInstance = new Quill(editor, {
      theme: 'snow',
      modules: {
        'toolbar': false
      },
      readOnly: true,
    });

    setQuill(quillInstance);
  }, []);

  useEffect(() => {
    if (quill != null) {
      documentService.getDocumentById(documentId).then(data => {
        quill.clipboard.dangerouslyPasteHTML(data.text);
        console.log(JSON.stringify(data));
        ReadingService.getReading(data.id).then(result => {
          if (result === null) {
            ReadingService.postReading(data.id);
            window.scrollTo(0, 0);
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
    if (quill && quill.on) {
      quill.on('selection-change', handleSelectionChange);
    }

    return () => {
      if (quill && quill.off) {
        quill.off('selection-change', handleSelectionChange);
      }
    };
  }, [quill, handleSelectionChange]);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("enviando: " + scrollPositionRef.current);
      ReadingService.putReading(documentId, scrollPositionRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AutoScroll></AutoScroll>
      <div className="container" ref={reference}></div>
    </>
  );
}
