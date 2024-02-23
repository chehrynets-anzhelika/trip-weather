import React from 'react';
import TripItem from '../TripItem/tripItem';
import "./tripList.css";
import testImage from '../../images/test.jpg';

const TripList = () => {
    return (
        <ul className='trip-list'>
            <li className='trip-item'><TripItem name={"Paris"} date={"15/07/2024"} img={testImage} /></li>
            <li className='trip-item'><TripItem /></li>
        </ul>
    );
}

export default TripList;
