import './ImageGeneratorForm.css'

import React, { useState } from 'react';
import { Slider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ImageGeneratorForm({ execute, isMobile }) {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const setParameters = () => {
    execute({ imagePrompt: imagePrompt, width: width, height: height });
  };

  const handleChangeImagePrompt = (event) => {
    setImagePrompt(event.target.value);
  };

  const handleChangeWidth = (event, newValue) => {
    setWidth(event.target.value);
  };

  const handleChangeHeight = (event, newValue) => {
    setHeight(event.target.value);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      {isMobile && (
        <div className="button-container">
          <VisibilityOff className="generator-toggle-button" onClick={toggleFormVisibility} />
        </div>
      )}
      {(!isMobile || isFormVisible) && (
        <div className="image-generator">
          <div className="center">
            <p>Image Generator</p>
          </div>
          <div className="top-image-container">
            <input
              className="image-prompt-input"
              type="text"
              placeholder="describe your image..."
              onChange={handleChangeImagePrompt}
            />
          </div>
          <div className="size-input-container">
            <div className="center">
              <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Width</p>
            </div>
            <Slider
              aria-label="width"
              defaultValue={512}
              step={8}
              marks
              min={512}
              max={1024}
              valueLabelDisplay="auto"
              style={{ color: '#333' }}
              onChange={handleChangeWidth}
            />
            <div className="center">
              <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Height</p>
            </div>
            <Slider
              aria-label="height"
              defaultValue={512}
              step={8}
              marks
              min={512}
              max={1024}
              valueLabelDisplay="auto"
              style={{ color: '#333' }}
              onChange={handleChangeHeight}
            />
          </div>
          <div className="input-button-container center">
            <button className="button" onClick={setParameters} type="button">Generate</button>
          </div>
        </div>
      )}
    </>
  );
}