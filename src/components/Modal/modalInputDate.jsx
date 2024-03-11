import React from 'react';


const ModalInputDate = (props) => {
    const title = props.title[0].toLowerCase() + props.title.slice(1);
    return (
        <div className='modal-item'>
            <label htmlFor={title} className="item-title">{props.title}</label>
            <input type="date" id={title} placeholder={props.placeholder} onChange={props.onChange}></input>
        </div>
    );
}

export default ModalInputDate;