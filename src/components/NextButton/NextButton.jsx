import React from 'react';
import styles from "./nextbutton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NextButton = (props) => {
    return (
        <>
            <div 
            onClick={props.onClick}
            type='button'
            className={`${props.className} ${props.position === "left" ? styles.buttonLeft : styles.buttonRight} ${styles.nextButton}`}>
            <FontAwesomeIcon icon={props.direction} className={styles.nextButtonIcon}/>
            </div>
        </>
    );
}

export default NextButton;
