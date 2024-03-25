import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CounterOfDays from '../CounterOfDays/counterOfDays';
import "./weatherToday.css";
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import { getTemperature } from '../../store/weatherTodaySlice';

const WeatherToday = () => {
    const dispatch = useDispatch();
    const currentCard = useSelector(state => state.currentTrip.current);
    const weatherInCurrentCity = useSelector(state => state.weatherToday.temp);
    const weatherInCurrentCityIsNotEmpty = weatherInCurrentCity && weatherInCurrentCity.days && weatherInCurrentCity.days[0];
    const dateTime = weatherInCurrentCityIsNotEmpty && weatherInCurrentCity.days[0].datetime;
    
    useEffect(() => {
       if(currentCard) {
        dispatch(getTemperature({city: currentCard.city.city, country: currentCard.city.country}));
       } 
    }, [currentCard, dispatch] )

    return (
        <>
            <div className='weather-today-wrap'>
             {currentCard ?  <p>{getDayOfWeek(dateTime)}</p> : <p>Day of Week</p>}
             <div>
             {weatherInCurrentCityIsNotEmpty ? <img width={30} height={30} alt={weatherInCurrentCity.days[0].icon} src={`./images/weatherIcons/${weatherInCurrentCity.days[0].icon}.svg`}></img> : <span>Icon</span>}
                <div className='weather-degree-wrap'>
                {weatherInCurrentCityIsNotEmpty ? <span>{Math.round(weatherInCurrentCity.days[0].tempmax)}</span> : <span>Max Degree</span>}
                {weatherInCurrentCityIsNotEmpty ? <span>{Math.round(weatherInCurrentCity.days[0].tempmin)}</span> : <span>Min Degree</span>}
                </div>    
             </div>
             {currentCard ? <p>{currentCard.city.city}</p> : <p>City Name</p>}
             <CounterOfDays />
            </div>
        </>
    )
}

export default WeatherToday;