import React from 'react';
import './Chips.css'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Chips(props) {
    return (
        <div className='chips m-2' >
            {props.text}
            {props.close && <FontAwesomeIcon icon={faX} />}
        </div>
    )
}

export default Chips