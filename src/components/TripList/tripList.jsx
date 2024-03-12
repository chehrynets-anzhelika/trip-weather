import React from 'react';
import AddTrip from '../AddTrip/addTrip';
import TripItem from '../TripItem/tripItem';
import { useSelector } from "react-redux";
import "./tripList.css";


const TripList = () => {
    const trips = useSelector(state => state.data.trips);
    return (
        <><AddTrip />
            <ul className='trip-list'>
                {trips.map((trip, idx) => (
                    <li className='trip-item' key={idx}><TripItem
                        city={trip.city.city}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                    /></li>
                ))}
            </ul>
            </>

    );
}

export default TripList;
