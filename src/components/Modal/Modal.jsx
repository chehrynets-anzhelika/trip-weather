import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalInputSelect from './ModalInputSelect';
import ModalInputDate from './ModalInputDate';
import ModalButton from './ModalButton';
import { closeModal } from '../../store/modalSlice';
import { saveCityImage, saveData, saveDataFromDB } from '../../store/dataSlice';
import fetchImage from '../../handlers/fetchImageCity';
import { formattedDate } from '../../handlers/formattedDate';
import { checkCopiesCards } from '../../handlers/checkDuplicate';
import "./modalReassign.css";
import saveDataInDB from '../../handlers/saveDataInDB';
import getDataFromDataBase from '../../handlers/getDataFromDB';
import { validateInputs } from '../../handlers/validateInputs';
import { getBodyScroll } from '../../handlers/hiddenBodyScroll';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);
    const cards = useSelector(state => state.data.trips);
    const isUser = useSelector(state => state.googleUser.id);

    const [city, setCity] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    const setStatesEmpty = useCallback(() => {
        setCity("");
        setStartDate(null);
        setEndDate(null);
        setError("");
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setStatesEmpty();
        } else {
            getBodyScroll("hidden", `${scrollBarWidth}px`);
        }
    }, [isOpen, setStatesEmpty]);


    const handleClose = useCallback((e) => {
        if (e.target === e.currentTarget || e.target.className === "modal-btn-cancel" || e.currentTarget.className === "modal-close" || e.target.parentElement.tagName === "svg") {
            dispatch(closeModal());
            getBodyScroll("auto", "");
        }
    }, [dispatch]);

    function onPlaceSelect(value) {
        setCity({
            city: value.properties.city,
            country: value.properties.country,
            id: Date.now(),
        });
    }

    const saveModalData = async () => {
        const error = validateInputs(city, startDate, endDate);
        if(error) {
            setError(error)
        } else {
            const formatStartDate = formattedDate(startDate);
            const formatEndDate = formattedDate(endDate);
            const isDuplicate = checkCopiesCards(cards, city, formatStartDate, formatEndDate);
            if (isDuplicate) { 
                setError("This trip already exists.") 
            } else {
                const cityImage = await fetchImage({ city: city.city, country: city.country });
                if(isUser === null) {
                dispatch(saveData({ city, startDate: formatStartDate, endDate: formatEndDate, selected: false }));
                dispatch(saveCityImage({ id: city.id, cityImage }));
                } else {
                    saveDataInDB(isUser, city.city, city.country, city.id, formatStartDate, formatEndDate, cityImage);
                    getDataFromDataBase(isUser)
                       .then(response => {
                           if(response) {
                                dispatch(saveDataFromDB(response));
                          } return;
                       });
                }
                setStatesEmpty();
                dispatch(closeModal());
                getBodyScroll("auto", "");
            }
        }
    };


    return (
        isOpen && <div className={styles.modal} onClick={handleClose}>
            <form className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Create trip</h2>
                    <FontAwesomeIcon className={styles.close} icon={faXmark} onClick={handleClose} />
                </div>
                <div className={styles.body}>
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

                <div className={styles.btnContainer}>
                    <ModalButton class={`${styles.btn} ${styles.btnCancel}`} title="Cancel" onClick={handleClose} />
                    <ModalButton class={`${styles.btn} ${styles.btnSave}`} title="Save" onClick={saveModalData} />
                </div>
            </form>
        </div>
    );
}

export default Modal;
