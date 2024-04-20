import React from 'react';
import { useDispatch } from "react-redux";
import "./addTrip.css";
import { openModal } from '../../store/modalSlice';

const AddTrip = () => {
    const dispatch = useDispatch();
    
    return (
        <>
        <button className='header-btn add-trip-btn' onClick = { () => dispatch(openModal()) }>Add trip</button>
        </>
    );
}

export default AddTrip;
