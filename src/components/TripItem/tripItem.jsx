import React from 'react';
import { useDispatch} from "react-redux";
import "./tripItem.css";
import { openModal } from '../../store/modalSlice';

const TripItem = (props) => {
    const dispatch = useDispatch();
    return (
        (props.img && props.name && props.date) ? <div className='trip-card'>
            <img src={props.img} alt="trip" width={200} height={200}></img>
            <p>{props.name}</p>
            <p>{props.date}</p>
        </div> : 
        <div className='trip-card-add' onClick = { () => dispatch(openModal()) }>
            <span> + </span>
            <p>Add trip</p>
        </div>
    );
}

export default TripItem;
