import { useState } from 'react';
import './Chip.css'

const Chips = ({ data, onDelete }) => {

    const [ selected, setSelected ] = useState(false);
    const changeState = () => {
        if (!selected){
            document.getElementById(data).setAttribute('class', 'selected-chip selectable');
        }
        else{
            document.getElementById(data).setAttribute('class', 'unselected-chip selectable');
        }

        setSelected(!selected);
    }

    return (
        <span id= {data} className='unselected-chip selectable' onClick={changeState}>
            {data}

        </span>
    );


}

export default Chips;