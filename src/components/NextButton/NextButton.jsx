import React from 'react';
import "./nextbutton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NextButton = (props) => {
    return (
        <>
            <button 
            onClick={props.onClick}
            type='button'
            className={`next-button ${props.position}`}>
            <FontAwesomeIcon icon={props.direction} className='next-button-icon'/>
            </button>
        </>
    );
}

export default NextButton;
