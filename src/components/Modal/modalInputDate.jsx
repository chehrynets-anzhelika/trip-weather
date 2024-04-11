import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ModalInputDate = (props) => {
    const title = props.title[0].toLowerCase() + props.title.slice(1);
    

    return (
        <div className='modal-item'>
            <label htmlFor={title} className="item-title">{props.title}</label>
            <DatePicker 
            id={title} 
            placeholderText={props.placeholder}
            selected={props.selected}
            onChange={props.onChange} 
            className="modal-input"
            dateFormat={"dd/MM/yyyy"}
            minDate={Date.now()}
            maxDate={props.maxDate}
            />
        </div>
    );
}

export default ModalInputDate;