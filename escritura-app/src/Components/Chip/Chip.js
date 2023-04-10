import { useState, useEffect } from 'react';
import './Chip.css'

const Chips = ({ data, onClick, active }) => {

    const [selected, setSelected] = useState(active);

    useEffect(() => {
        if (!active) {
            document.getElementById(data).setAttribute('class', 'selected-chip selectable');
        }
        else {
            document.getElementById(data).setAttribute('class', 'unselected-chip selectable');
        }
    }, []);

    const changeState = () => {
        if (selected) {
            document.getElementById(data).setAttribute('class', 'selected-chip selectable');
        }
        else {
            document.getElementById(data).setAttribute('class', 'unselected-chip selectable');
        }
        onClick(data);

        setSelected(!selected);
    }

    return (
        <span id={data} className='unselected-chip selectable' onClick={changeState}>
            {data}

        </span>
    );


}

export default Chips;