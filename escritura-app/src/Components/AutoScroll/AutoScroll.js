import React, { useState, useEffect } from 'react';
import { Slider, IconButton } from '@mui/material';
import { PlayArrow, Stop } from '@mui/icons-material';
import './AutoScroll.css';

function AutoScroll() {
    const [scrollSpeed, setScrollSpeed] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

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

    return (
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
            <IconButton onClick={toggleAutoScroll}>
                {isAutoScrolling ? <Stop /> : <PlayArrow />}
            </IconButton>
        </div>
    );
}

export default AutoScroll;