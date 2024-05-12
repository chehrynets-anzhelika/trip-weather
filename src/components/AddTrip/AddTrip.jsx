import React from 'react';
import { useDispatch } from "react-redux";
import styles from "./addTrip.module.css";
import { openModal } from '../../store/modalSlice';

const AddTrip = () => {
    const dispatch = useDispatch();
    
    return (
        <>
        <button className={`header-btn ${styles.addTripBtn} ${styles.btn}`} onClick = { () => dispatch(openModal()) } data-testid="button">Add trip</button>
        </>
    );
}

export default AddTrip;
