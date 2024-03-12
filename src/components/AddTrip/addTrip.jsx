import React from 'react';
import { useDispatch } from "react-redux";
import "./addTrip.css";
import { openModal } from '../../store/modalSlice';

const AddTrip = () => {
    const dispatch = useDispatch();
    
    return (
        <div className='trip-card-add' onClick = { () => dispatch(openModal()) }>
            <span> + </span>
            <p>Add trip</p>
        </div>
    );
}

export default AddTrip;
