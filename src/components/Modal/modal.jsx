import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalInputSelect from './modalInputSelect';
import ModalInputDate from './modalInputDate';
import ModalButton from './modalButton';
import { closeModal } from '../../store/modalSlice';
import { saveCityImage, saveData } from '../../store/dataSlice';
import fetchImage from '../../handlers/fetchImageCity';
import { isWithin14Days } from '../../handlers/checkDate';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);

    const [city, setCity] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");

    const setStatesEmpty = useCallback(() => {
        setCity("");
        setStartDate("");
        setEndDate("");
        setError("");
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setStatesEmpty();
        }
    }, [isOpen, setStatesEmpty]);

    const handleClose = useCallback((e) => {
        if (e.target === e.currentTarget || e.target.className === "modal-btn-cancel" || e.currentTarget.className === "modal-close") {
            dispatch(closeModal());
        }
    }, [dispatch]);

    function onPlaceSelect(value) {
        setCity({
            city: value.properties.city,
            country: value.properties.country,
        });
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    const saveModalData = useCallback(async() => {
        
        if (!city.city && startDate && endDate) {
            setError("Please enter a city.");
        } else if (!city.city || !startDate || !endDate) {
            setError("Please field all input.");
        } else if (city.city && startDate === endDate) {
            setError("Start date mustn't be end date.");
        } else if(city.city && new Date(startDate) > new Date(endDate)) {
           setError("The start date must not be less than the end date."); 
        }else if(!isWithin14Days(startDate)){
          setError("The start date must be within the next 14 days including this day.");
        } else if(!isWithin14Days(endDate)){
            setError("The end date must be within the next 14 days including this day.");
        }else {
            dispatch(saveData({ city, startDate, endDate }));
            const cityImage = await fetchImage(city.city);
            dispatch(saveCityImage({ city: city.city, cityImage }));
            setStatesEmpty();
        }
    }, [city, startDate, endDate, dispatch, setStatesEmpty]);

    return (
        isOpen && <div className='modal' onClick={handleClose}>
            <form className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Create trip</h2>
                    <FontAwesomeIcon className='modal-close' icon={faXmark} onClick={handleClose} />
                </div>
                <div className='modal-body'>
                    <ModalInputSelect
                        title="City"
                        placeholder="Please select a city"
                        onPlaceSelect={onPlaceSelect}
                        value={city.city}
                    />
                    <ModalInputDate
                        title="Start date"
                        placeholder="Select date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        min={today}
                    />
                    <ModalInputDate
                        title="End date"
                        placeholder="Select date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <ModalButton class="modal-btn-cancel" title="Cancel" onClick={handleClose} />
                <ModalButton class="modal-btn-save" title="Save" onClick={saveModalData} />
            </form>
        </div>
    );
}

export default Modal;
