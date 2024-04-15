import React, { useState, useEffect } from 'react';
import "./tripItem.css";
import { selectTrip, deleteSelectTrip } from '../../store/tripSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedCard, unSelectedCard, deleteCard } from '../../store/dataSlice';
import CardLoader from '../Loader/CardLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { clearCurrentForecast } from '../../store/forecastSlice';


const TripItem = (props) => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.data.trips);

    const [loading, setLoading] = useState(true);

    const clickOnCardHandler = (e) => {
       if(e.target.tagName === "path") return;
            let foundTrip = trips.find(trip => trip.city.id.toString() === e.currentTarget.id);
            dispatch(selectTrip(foundTrip));
            dispatch(unSelectedCard());
            dispatch(saveSelectedCard(e.currentTarget.id));
    }

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 2000)
    }, [props.displayTrips]);

    const handlerDeleteCard = () => {
        dispatch(deleteCard(props.id));
        dispatch(deleteSelectTrip());
        dispatch(clearCurrentForecast());
    }

    return (
        <>
            {loading ? <CardLoader className="card-loader" width={365} height={340} /> : <div onClick={clickOnCardHandler} id={props.id} className={`trip-item ${props.selected ? "trip-item--checked" : ""}`}>
                <div className='trip-item-img'>
                    <img src={props.cityImage} alt={props.cityName} width="368" height="272"></img></div>
                <div className='trip-item-info'>
                    <div><p className='trip-item-city'>{props.city}</p>
                        <time className='trip-item-dates'>{props.startDate} - {props.endDate}</time></div>
                    <FontAwesomeIcon icon={faTrash} className="card-delete-icon" onClick={handlerDeleteCard} />
                </div>
            </div>
            }</>

    );
}

export default TripItem;
