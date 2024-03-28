import React from 'react';
import TripItem from '../TripItem/tripItem';
import { useSelector } from "react-redux";
import "./tripList.css";

const TripList = () => {
    const trips = useSelector(state => state.data.trips);
    const filteredTrips = useSelector(state => state.data.filteredTrips);
    const searchValue  = useSelector(state => state.search.searchValue);
    const displayTrips = !searchValue ? trips : filteredTrips;

    return (
        <>
            <div className='trip-card-wrap'>
            <ul className='trip-list'>
                {displayTrips.map((trip, idx) => (
                    <li key={idx}>
                    <TripItem
                        id={trip.city.id}
                        selected={trip.selected}
                        cityImage={trip.cityImage}
                        cityName={trip.city.city}
                        city={trip.city.city}
                        startDate={trip.startDate}
                        endDate={trip.endDate}/>
                    </li>
                ))}
            </ul>
            </div>
        </>

    );
}

export default TripList;
