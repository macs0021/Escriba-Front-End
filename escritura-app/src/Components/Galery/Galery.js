import './Galery.css';
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import { useState } from 'react';


export default function Galery(props) {

    const cards = props.cards;


    return (
        <>
            <div className="galery-center">
                <div className="galery-container">
                    {cards.map((card) => <Card card={card} key={card.id} />)}
                </div>
            
            </div>
        </>
    );
}