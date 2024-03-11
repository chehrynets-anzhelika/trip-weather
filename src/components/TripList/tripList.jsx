import React from 'react';
import AddTrip from '../AddTrip/addTrip';
import "./tripList.css";

const TripList = () => {
    return (
        <ul className='trip-list'>
            <li className='trip-item'><AddTrip /></li>
        </ul>
    );
}

export default TripList;
