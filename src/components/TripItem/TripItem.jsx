import React, { useState, useEffect } from 'react';
import styles from "./tripItem.module.css";
import { selectTrip, deleteSelectTrip } from '../../store/tripSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedCard, unSelectedCard, deleteCard } from '../../store/dataSlice';
import CardLoader from '../Loader/CardLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { clearCurrentForecast } from '../../store/forecastSlice';
import deleteFromDataBase from '../../handlers/deleteFromDB';


const TripItem = (props) => {
    const dispatch = useDispatch();
    const trips = useSelector(state => state.data.trips);
    const user = useSelector(state => state.googleUser.id);

    const [loading, setLoading] = useState(true);

    const clickOnCardHandler = (e) => {
        if (e.target.tagName === "path") return;
        let foundTrip = trips.find(trip => trip.city.id.toString() === e.currentTarget.id);
        dispatch(selectTrip(foundTrip));
        dispatch(unSelectedCard());
        dispatch(saveSelectedCard(e.currentTarget.id));
    }

    useEffect(() => {
        const allPropsLoaded = Object.values(props).every(prop => prop !== undefined);
        allPropsLoaded ? setLoading(false) : setLoading(true);

    }, [props]);

    const handlerDeleteCard = async() => {
        dispatch(deleteCard(props.id));
        dispatch(deleteSelectTrip());
        dispatch(clearCurrentForecast());
        dispatch(unSelectedCard());
        if(user !== null) {
            deleteFromDataBase(user, props.id);
        }
    }

    return (
        <>
            {loading ? <CardLoader className={styles.cardLoader} width={365} height={340} /> : <div onClick={clickOnCardHandler} id={props.id} className={`${styles.item} ${props.selected ? styles.checked : ""}`}>
                <div>
                    <img className={styles.img} src={props.cityImage} alt={props.cityName} width="368" height="272"></img></div>
                <div className={styles.itemInfo}>
                    <div><p className={styles.itemCity}>{props.city}</p>
                        <time className={styles.itemDates}>{props.startDate} - {props.endDate}</time></div>
                    <FontAwesomeIcon icon={faTrash} className={styles.cardDelete} onClick={handlerDeleteCard} />
                </div>
            </div>
            }</>

    );
}

export default TripItem;
