import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalInputSelect from './modalInputSelect';
import ModalInputDate from './modalInputDate';
import ModalButton from './modalButton';
import { closeModal } from '../../store/modalSlice';
import { saveData } from '../../store/dataSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);

    const [city, setCity] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleClose = (e) => {
        if (e.target.className === "modal") {
            dispatch(closeModal());
        }
    }

    function onPlaceSelect(value) {
        setCity({
            city: value.properties.city,
            country: value.properties.country,
        })
    }

    return (
        isOpen && <div className='modal' onClick={handleClose}>
            <form className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Create trip</h2>
                    <FontAwesomeIcon className='modal-close' icon={faXmark} onClick={() => dispatch(closeModal())} />
                </div>
                <div className='modal-body'>
                    <ModalInputSelect
                        title="City"
                        placeholder="Please select a city"
                        onPlaceSelect={onPlaceSelect}
                    />
                    <ModalInputDate
                        title="Start date"
                        placeholder="Select date"
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <ModalInputDate
                        title="End date"
                        placeholder="Select date"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <ModalButton class="modal-btn-cancel" title="Cancel" onClick={() => dispatch(closeModal())} />
                <ModalButton class="modal-btn-save" title="Save" onClick={() => dispatch(saveData({
                    city: city,
                    startDate: startDate,
                    endDate: endDate
                }))} />
            </form>
        </div>
    );
}

export default Modal;
