import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalInputSelect from './modalInputSelect';
import ModalInputDate from './modalInputDate';
import ModalButton from './modalButton';
import { closeModal } from '../../store/modalSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);

    const handleClose = (e) => {
        if (e.target.className === "modal") {
            dispatch(closeModal());
        }
    }

    return (
        isOpen && <div className='modal' onClick={handleClose}>
            <form className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Create trip</h2>
                    <FontAwesomeIcon className='modal-close' icon={faXmark} onClick={() => dispatch(closeModal())} />
                </div>
                <div className='modal-body'>
                    <ModalInputSelect title="City" placeholder="Please select a city" />
                    <ModalInputDate title="Start date" placeholder="Select date" />
                    <ModalInputDate title="End date" placeholder="Select date" />
                </div>

                <ModalButton class="modal-btn-cancel" title="Cancel" onClick={() => dispatch(closeModal())} />
                <ModalButton class="modal-btn-save" title="Save" />
            </form>
        </div>
    );
}

export default Modal;
