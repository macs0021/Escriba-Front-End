import React, { useState, useEffect, useRef } from 'react';
import { Slider, IconButton } from '@mui/material';
import { PlayArrow, Stop, Visibility, VisibilityOff } from '@mui/icons-material';
import './AutoScroll.css';

function AutoScroll({ isMobile, visible, stop }) {
    const [scrollSpeed, setScrollSpeed] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isShowing, setIsShowing] = useState(!isMobile);
    const [divStyle, setDivStyle] = useState({});
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        const id = setInterval(() => {
            if (isAutoScrolling) {
                window.scrollBy(0, 1);
            }
        }, 3000 / (scrollSpeed + 1));

        setIntervalId(id);

        return () => clearInterval(id);
    }, [scrollSpeed, isAutoScrolling]);

    const toggleAutoScroll = () => {
        setIsAutoScrolling(!isAutoScrolling);
    };

    const handleVisibilityToggle = () => {
        setIsShowing(!isShowing);
    };

    useEffect(() => {
        if (visible) {
            setDivStyle({ visibility: 'visible' });
        } else {
            setDivStyle({ visibility: 'hidden' });
        }
    }, [visible]);


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setIsAutoScrolling(!stop);
        }
    }, [stop]);

    return (
        <div style={divStyle}>
            {isMobile && <div className="AutoScroll-button" onClick={handleVisibilityToggle}>
                <div>
                    {isShowing ? <VisibilityOff /> : <Visibility />}
                </div>
            </div>}
            {(isShowing || !isMobile) && (
                <div className="AutoScroll">
                    <Slider
                        orientation="vertical"
                        value={scrollSpeed}
                        onChange={(event, newValue) => setScrollSpeed(newValue)}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                        style={{ color: '#333' }}
                    />
                    <div onClick={toggleAutoScroll}>
                        {isAutoScrolling ? <Stop /> : <PlayArrow />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AutoScroll;