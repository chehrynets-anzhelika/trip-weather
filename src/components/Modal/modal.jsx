import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from "./modal.module.css";
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
import { checkCopiesCards } from '../../handlers/checkDuplicate';
import "./modalReassign.css";

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);
    const cards = useSelector(state => state.data.trips);

    const [city, setCity] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");

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

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
            document.body.classList.remove("no-scroll");
        }

    }, []);

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

    const saveModalData = useCallback(async () => {

        if (!city.city && startDate && endDate) {
            setError("Please enter a city.");
        } else if (!city.city || !startDate || !endDate) {
            setError("Please field all input.");
        } else if (city.city && startDate === endDate) {
            setError("Start date mustn't be end date.");
        } else if (city.city && new Date(startDate) > new Date(endDate)) {
            setError("The start date must not be less than the end date.");
        } else if (!isWithin14Days(startDate)) {
            setError("The start date must be within the next 14 days including this day.");
        } else if (!isWithin14Days(endDate)) {
            setError("The end date must be within the next 14 days including this day.");
        } else {
            const formatStartDate = formattedDate(startDate);
            const formatEndDate = formattedDate(endDate);
            const isDuplicate = checkCopiesCards(cards, city, formatStartDate, formatEndDate);
            if (isDuplicate) { setError("This trip already exists.") } else {
                dispatch(saveData({ city, startDate: formatStartDate, endDate: formatEndDate, selected: false }));
                const cityImage = await fetchImage({ city: city.city, country: city.country });
                dispatch(saveCityImage({ id: city.id, cityImage }));
                setStatesEmpty();
            }

        }
    }, [city, startDate, endDate, dispatch, setStatesEmpty]);

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
