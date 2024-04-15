import React, { useState, useEffect } from 'react';
import "./tripItem.css";
import { selectTrip } from '../../store/tripSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedCard, unSelectedCard } from '../../store/dataSlice';
import CardLoader from '../Loader/CardLoader';


const TripItem = (props) => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.data.trips);

    const [loading, setLoading] = useState(true);

    const clickOnCardHandler = (e) => {
        let foundTrip = trips.find(trip => trip.city.id.toString() === e.currentTarget.id);
        dispatch(selectTrip(foundTrip));
        dispatch(unSelectedCard());
        dispatch(saveSelectedCard(e.currentTarget.id));
    }

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 2000)
    }, [props.displayTrips]);

    return (
        <>
            {loading ? <CardLoader className="card-loader" width={365} height={340} /> : <div onClick={clickOnCardHandler} id={props.id} className={`trip-item ${props.selected ? "trip-item--checked" : ""}`}>
                <div className='trip-item-img'>
                    <img src={props.cityImage} alt={props.cityName} width="368" height="272"></img></div>
                <div className='trip-item-info'>
                    <p className='trip-item-city'>{props.city}</p>
                    <time className='trip-item-dates'>{props.startDate} - {props.endDate}</time>
                </div>
            </div>
            }</>

    );
}

export default TripItem;
