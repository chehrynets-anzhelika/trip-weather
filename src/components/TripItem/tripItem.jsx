import React from 'react';
import "./tripItem.css";
import { selectTrip } from '../../store/tripSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedCard, unSelectedCard } from '../../store/dataSlice';

const TripItem = (props) => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.data.trips);  

    const clickOnCardHandler = (e) => {
        let foundTrip = trips.find(trip => trip.city.id.toString() === e.currentTarget.id);
        dispatch(selectTrip(foundTrip));
        dispatch(unSelectedCard());
        dispatch(saveSelectedCard(e.currentTarget.id));
    }
    return (
        <div onClick={clickOnCardHandler} id={props.id} className={props.selected ? "trip-item--checked": "trip-item"}>
            <img src={props.cityImage} alt={props.cityName} width="400" height="350"></img>
            <p>{props.city}</p>
            <time>{props.startDate} - {props.endDate}</time>
        </div>
    );
}

export default TripItem;
