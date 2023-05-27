import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import '../../Views/TextEditor/TextEditor.css';
import documentService from '../../Services/DocumentService'
import ReadingService from "../../Services/ReadingService";
import AutoScroll from "../AutoScroll/AutoScroll";
import TextBubble from "../TextBubble/TextBubble";

export default function Document() {
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  const scrollPositionRef = useRef(0);
  const [showBubble, setShowBubble] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [bubblePos, setBubblePos] = useState(true);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const position = window.pageYOffset;
    scrollPositionRef.current = position;
  };


  const getWordAtIndex = useCallback((content, index) => {
    const length = content.length;
    let start = index;
    let end = index;

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
  }, []);

  const isSeparator = (char) => {

    const separators = [" ", ".", ",", ";", "\n", "!", "¡", "-", "?", "¿", '"'];
    return separators.includes(char);
  };

  const handleWordIndexChange = useCallback((index) => {
    if (quill !== null) {
      const content = quill.getText();
      const word = getWordAtIndex(content, index);
      if (word.trim() !== "") {
        setSelectedWord(word);
      }
      const start = content.lastIndexOf(" ", index) + 1;
      const end = content.indexOf(" ", index);
      const wordLength = end - start;
      const bounds = quill.getBounds(start, wordLength);

      const wordPosition = bounds.top;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (wordPosition - scrollPosition < windowHeight / 2) {
        setBubblePos(true);
      } else {
        setBubblePos(false);
      }
      setShowBubble(true);
    }
  }, [quill, getWordAtIndex]);

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

    containerRef.current = refe;
    setQuill(quillInstance);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('click', (event) => {
        const target = event.target;
        const quillEditor = container.querySelector('.ql-editor');

        if (quillEditor && quillEditor.contains(target) && target.tagName === 'P') {
          setShowBubble(true);
        } else {
          setShowBubble(false);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('click', (event) => {
          const target = event.target;
          const quillEditor = container.querySelector('.ql-editor');

          if (quillEditor && quillEditor.contains(target) && target.tagName === 'P') {
            setShowBubble(true);
          } else {
            setShowBubble(false);
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    if (quill != null) {
      documentService.getDocumentById(documentId).then(data => {
        quill.clipboard.dangerouslyPasteHTML(data.text);
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
  }, [quill, documentId]);

  const handleSelectionChange = useCallback(() => {
    if (quill && quill.getSelection) {
      const range = quill.getSelection();
      if (range) {
        if (range.length === 0) {
          handleWordIndexChange(range.index);
        }
      }
    }
  }, [quill, handleWordIndexChange]);


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
  }, [documentId]);

  return (
    <>
      {showBubble && <TextBubble top={bubblePos} word={selectedWord} setShowBubble={setShowBubble} />}
      <AutoScroll></AutoScroll>
      <div className="container" ref={reference}></div>
    </>
  );
}