import './Galery.css';
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import { useState } from 'react';


export default function Galery({ children }) {

    return (
        <>
            <div className="galery-center">
                <div className="galery-container">
                    {children}
                </div>

            </div>
        </>
    );
}