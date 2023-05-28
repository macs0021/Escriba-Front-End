import { useState, useEffect } from 'react';
import './Chip.css'

const Chips = ({ id, data, onClick, active }) => {

    const [selected, setSelected] = useState(active);

    useEffect(() => {
        if (!active) {
            document.getElementById(id).setAttribute('class', 'selected-chip selectable');
        }
        else {
            document.getElementById(id).setAttribute('class', 'unselected-chip selectable');
        }
    }, [active, id]);

    const changeState = () => {
        if (selected) {
            document.getElementById(id).setAttribute('class', 'selected-chip selectable');
        }
        else {
            document.getElementById(id).setAttribute('class', 'unselected-chip selectable');
        }
        onClick(data);

        setSelected(!selected);
    }

    return (
        <span id={id} className='unselected-chip selectable' onClick={changeState}>
            {data}

        </span>
    );


}

export default Chips;