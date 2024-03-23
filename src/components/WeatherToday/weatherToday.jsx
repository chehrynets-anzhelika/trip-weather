import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CounterOfDays from '../CounterOfDays/counterOfDays';
import "./weatherToday.css";
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import { getTemperature } from '../../store/weatherTodaySlice';

const WeatherToday = () => {
    const dispatch = useDispatch();
    const currentCard = useSelector(state => state.currentTrip.current);
    
    useEffect(() => {
       if(currentCard) {
        dispatch(getTemperature({city: currentCard.city.city, country: currentCard.city.country}));
       } 
    }, [currentCard, dispatch] )

    return (
        <>
            <div className='weather-today-wrap'>
             {currentCard ?  <p>{getDayOfWeek()}</p> : <p>Day of Week</p>}
             <div>
                <p>icon</p>
                <span>Max Degree</span>
                <span>Min Degree</span>
             </div>
             {currentCard ? <p>{currentCard.city.city}</p> : <p>City Name</p>}
             <CounterOfDays />
            </div>
        </>
    )
}

export default WeatherToday;