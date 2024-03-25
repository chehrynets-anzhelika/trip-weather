import React from 'react';
import { useSelector } from 'react-redux';
import "./counterOfDays.css";
import Countdown from "react-countdown"

const CounterOfDays = () => {

    const currentCard = useSelector(state => state.currentTrip.current);
    const startDateIsNotEmpty = currentCard && currentCard.startDate;

    return (
        <>
            <div>
                {startDateIsNotEmpty ? <Countdown date={`${startDateIsNotEmpty}T00:00:00`}></Countdown> : <span>00:00:00:00</span>}
            </div>
        </>)
}

export default CounterOfDays;