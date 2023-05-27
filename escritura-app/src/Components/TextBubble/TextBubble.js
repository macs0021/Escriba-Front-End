import React, { useState, useEffect } from 'react';
import { getDefinition } from '../../Services/DictionaryService';
import Loader from '../Loader/Loader';
import './TextBubble.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TextBubble = ({ top, word, setBubbleHeight, setShowBubble }) => {
  const [loading, setLoading] = useState(false);
  const [definitions, setDefinitions] = useState([]);
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);


  useEffect(() => {
    setLoading(true);
    getDefinition(word)
      .then((result) => {
        setLoading(false);
        if (result.error) {
          setDefinitions([{ definition: "No definition for this word can be found" }]);
        } else {
          setDefinitions(result[0].meanings[0].definitions);
          setCurrentDefinitionIndex(0);
        }
      });
  }, [word]);

  const bubbleClassName = !top ? 'TextBubbleTop' : 'TextBubbleBottom';

  const handleNextDefinition = () => {
    if (currentDefinitionIndex < definitions.length - 1) {
      setCurrentDefinitionIndex(currentDefinitionIndex + 1);
    }
  };

  const handlePreviousDefinition = () => {
    if (currentDefinitionIndex > 0) {
      setCurrentDefinitionIndex(currentDefinitionIndex - 1);
    }
  };

  const canGoBack = currentDefinitionIndex > 0;
  const canGoForward = currentDefinitionIndex < definitions.length - 1;

  return (
    <div className={`TextBubble ${bubbleClassName}`} id="text-bubble">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='row space-around'>
            <div className='row'>
              <ArrowBackIosIcon
                onClick={handlePreviousDefinition}
                className={!canGoBack ? 'disabled-arrow' : 'cickable'}
              />
              <div className="center-content">
                <h3>{word.charAt(0).toUpperCase() + word.slice(1)}</h3>
              </div>
              <ArrowForwardIosIcon
                onClick={handleNextDefinition}
                className={!canGoForward ? 'disabled-arrow' : 'clickable'}
              />
            </div>
          </div>
          {definitions.length > 0 && (
            <>
              <div className="definition-content">
                <p>{definitions[currentDefinitionIndex].definition}</p>
              </div>
            </>
          )}
        </>
      )}
      <CloseIcon onClick={() => setShowBubble(false)} className="close-icon" />
    </div>
  );
};

export default TextBubble;