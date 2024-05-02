import React, { useEffect, useState } from 'react';
import TripItem from '../TripItem/TripItem';
import { useSelector } from "react-redux";
import styles from "./tripList.module.css";
import getDataFromDataBase from '../../handlers/getDataFromDB';
import { saveDataFromDB } from '../../store/dataSlice';
import { useDispatch } from 'react-redux';
import MySlider from '../Slider/Slider';

const TripList = () => {
    const trips = useSelector(state => state.data.trips);
    const filteredTrips = useSelector(state => state.data.filteredTrips);
    const searchValue = useSelector(state => state.search.searchValue);
    let displayTrips = !searchValue ? trips : filteredTrips;
    const sort = useSelector(state => state.sort.sortValue);
    const dispatch = useDispatch();

    const [sortedCards, setSortedCards] = useState(displayTrips);

    const user = useSelector(state => state.googleUser.id);

    useEffect(() => {
        if(user !== null) {
             getDataFromDataBase(user)
             .then(response => {
                if(response) {
                    dispatch(saveDataFromDB(response));
                } return;
             })
        }
        return;
    }, [user, dispatch]);

    useEffect(() => {
        let sorted = [...displayTrips];
        if (sort === "earliest") {
            sorted.sort((a, b) => {
                return new Date(a.startDate) - new Date(b.startDate)
            });
        } else if (sort === "latest") {
            sorted.sort((a, b) => {
                return new Date(b.startDate) - new Date(a.startDate);
            })
        }
        setSortedCards(sorted);
    }, [sort, displayTrips])

    return (
        <>
             {
                !trips.length ? <p className={styles.messageCard}>You haven’t created any trips yet</p> : <MySlider cards={sortedCards}>
                    {sortedCards.map((trip) => (
                        <div key={trip.city.id} className={styles.card}>
                            <TripItem
                                id={trip.city.id}
                                selected={trip.selected}
                                cityImage={trip.cityImage}
                                cityName={trip.city.city}
                                city={trip.city.city}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                            />
                        </div>
                    ))}
                </MySlider>
            } 
        </>
    );
}

export default TripList;
