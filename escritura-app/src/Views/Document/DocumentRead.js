import React, { useCallback, useEffect, useRef, useState } from "react";
import 'quill/dist/quill.snow.css';
import { Quill } from "react-quill";
import { useParams } from 'react-router-dom';
import 'quill-divider';
import './Document.css';
import { getDocumentById } from "../../Services/DocumentService";
import { putReading, postReading, getReading, checkReading } from "../../Services/ReadingService";
import AutoScroll from "../../Components/AutoScroll/AutoScroll";
import TextBubble from "../../Components/TextBubble/TextBubble";

export default function DocumentRead() {
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  const scrollPositionRef = useRef(0);
  const [showBubble, setShowBubble] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [bubblePos, setBubblePos] = useState(true);
  const containerRef = useRef(null);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

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

        console.log("Button: " + event.button)

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
    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', (event) => {
        setShowBubble(false);
      });
    }
    return () => {
      if (container) {
        container.removeEventListener('contextmenu', (event) => {
          setShowBubble(false);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (quill != null) {
      getDocumentById(documentId).then(data => {
        quill.clipboard.dangerouslyPasteHTML(data.text);
        checkReading(data.id).then((result) => {
          if (result===true) {
            getReading(data.id).then((readingResult) => {
              window.scrollTo(0, readingResult.readingSpot);
            })
          } else {
            postReading(data.id);
            window.scrollTo(0, 0);
          }
        })
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

  //useEffect que escucha el scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //useEffect que se encarga de escuchar las pulsaciones sobre la vista
  useEffect(() => {
    if (quill && quill.on) {
      quill.on('editor-change', handleSelectionChange);
    }

    return () => {
      if (quill && quill.off) {
        quill.off('editor-change', handleSelectionChange);
      }
    };
  }, [quill, handleSelectionChange]);

  //useEffect que se encarga de enviar el scroll
  useEffect(() => {
    const interval = setInterval(async () => {
      putReading(documentId, scrollPositionRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, [documentId]);

  return (
    <>
      {showBubble && <TextBubble top={bubblePos} word={selectedWord} setShowBubble={setShowBubble} />}
      {<AutoScroll isMobile={isMobile} visible={(!isMobile || !showBubble)} stop={showBubble}></AutoScroll>}
      <div className="container" ref={reference}></div>
    </>
  );
}