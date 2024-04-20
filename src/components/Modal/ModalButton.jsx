import React from 'react';

const ModalButton = (props) => {
    return (
        <button type='button' className={props.class} onClick={props.onClick}>{props.title}</button>
    );
}

export default ModalButton;