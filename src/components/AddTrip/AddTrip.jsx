import React from 'react';
import { useDispatch } from "react-redux";
import styles from "./addTrip.module.css";
import { openModal } from '../../store/modalSlice';

const AddTrip = () => {
    const dispatch = useDispatch();
    
    return (
        <>
        <button className={`header-btn ${styles.addTripBtn}`} onClick = { () => dispatch(openModal()) }>Add trip</button>
        </>
    );
}

export default AddTrip;
