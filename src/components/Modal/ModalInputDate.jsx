import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./modal.module.css";
import "./modalReassign.css";


const ModalInputDate = (props) => {
    const title = props.title[0].toLowerCase() + props.title.slice(1);
    

    return (
        <div className={styles.item}>
            <label htmlFor={title} className={styles.itemTitle}>{props.title}</label>
            <DatePicker 
            id={title} 
            placeholderText={props.placeholder}
            selected={props.selected}
            onChange={props.onChange} 
            onFocus={(e) => e.target.readOnly = true}
            className={styles.modalInput}
            dateFormat={"dd/MM/yyyy"}
            minDate={Date.now()}
            maxDate={props.maxDate}
            />
        </div>
    );
}

export default ModalInputDate;