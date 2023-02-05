import './Galery.css';
import Card from '../Card/Card'

export default function Galery(props) {

    const cards = props.cards;

    return (
        <>
            <div className="galery-center">
                <div className="galery-container">
                    {cards.map((card) => <Card card={card} />)}
                </div>
            </div>
        </>
    );
}