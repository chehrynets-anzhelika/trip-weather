import React from 'react';
import { useSelector } from 'react-redux';
import "./counterOfDays.css";
import Countdown from "react-countdown"

const CounterOfDays = () => {

    const currentCard = useSelector(state => state.currentTrip.current);
    const startDateIsNotEmpty = currentCard && currentCard.startDate;
    
    const Complete = () => <span>The trip starts today!</span>;
    return (
        <>
            <div className='today-trip-start'>
                {startDateIsNotEmpty && <Countdown
                key={startDateIsNotEmpty}
                date={`${startDateIsNotEmpty}T00:00:00`
                }>
                <Complete/>
                </Countdown>}
            </div>
        </>)
}

export default CounterOfDays;