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
import { formattedDate } from '../../handlers/formattedDate';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);

    const [city, setCity] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");

    let formatStartDate = "";
    let formatEndDate = "";

    useEffect(() => {
        if(startDate && endDate) {
            formatStartDate = formattedDate(startDate);
            formatEndDate = formattedDate(endDate);
        }

    }, [startDate, endDate])

    const setStatesEmpty = useCallback(() => {
        setCity("");
        setStartDate(null);
        setEndDate(null);
        setError("");
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setStatesEmpty();
        }
    }, [isOpen, setStatesEmpty]);

    const handleClose = useCallback((e) => {
        if (e.target === e.currentTarget || e.target.className === "modal-btn-cancel" || e.currentTarget.className === "modal-close" || e.target.parentElement.tagName === "svg") {
            
            dispatch(closeModal());
        }
    }, [dispatch]);

    function onPlaceSelect(value) {
        setCity({
            city: value.properties.city,
            country: value.properties.country,
            id: Date.now(),
        });
    }
    
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
            dispatch(saveData({ city, startDate: formatStartDate, endDate: formatEndDate }));
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
                        onChange={(data) => setStartDate(data)}
                        selected={startDate}
                    />
                    <ModalInputDate
                        title="End date"
                        placeholder="Select date"
                        onChange={(data) => setEndDate(data)}
                        selected={endDate}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

<div className='modal-btn-container'>
    <ModalButton class="modal-btn modal-btn-cancel" title="Cancel" onClick={handleClose} />
                <ModalButton class="modal-btn modal-btn-save" title="Save" onClick={saveModalData} />
</div>
                
            </form>
        </div>
    );
}

export default Modal;
