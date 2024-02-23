import React from 'react';

const ModalInputSelect = (props) => {
    const title = props.title[0].toLowerCase() + props.title.slice(1);
    return (
        <div className='modal-item'>
            <label htmlFor={title} className="item-title">{props.title}</label>
            <input list="options" name="option" id={title} placeholder={props.placeholder}/>
                <datalist id="options">
                    <option value="Харьков"></option>
                    <option value="Киев"></option>
                    <option value="Винница"></option>
                </datalist>
        </div>
    );
}

export default ModalInputSelect;