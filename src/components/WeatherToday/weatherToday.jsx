import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CounterOfDays from '../CounterOfDays/counterOfDays';
import "./weatherToday.css";
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import { getTemperature } from '../../store/weatherTodaySlice';
import WeatherTodayLoader from '../Loader/WeatherTodayLoader';

const WeatherToday = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const currentCard = useSelector(state => state.currentTrip.current);
    const weatherInCurrentCity = useSelector(state => state.weatherToday.temp);
    const weatherInCurrentCityIsNotEmpty = weatherInCurrentCity && weatherInCurrentCity.days && weatherInCurrentCity.days[0];
    const dateTime = weatherInCurrentCityIsNotEmpty && weatherInCurrentCity.days[0].datetime;

    useEffect(() => {
        if (currentCard) {
            dispatch(getTemperature({ city: currentCard.city.city, country: currentCard.city.country }));
        }
    }, [currentCard, dispatch])

    useEffect(() => {
        Object.keys(weatherInCurrentCity).length !== 0 ? setLoading(false) : setLoading(true);
    }, [weatherInCurrentCity])

    return (
        <>
            <div className={`weather-today-wrap ${currentCard ? "visible" : ""}`}>
                {
                    loading ? <WeatherTodayLoader className="loader" width={280} height={180} /> : <><div className='today-info'>
                        {currentCard && <p className='today-day'>{getDayOfWeek(dateTime)}</p>}
                        {currentCard && <p className='today-city'>{currentCard.city.city}</p>}
                        <div>
                            <div className='today-degrees-wrap'>
                                {weatherInCurrentCityIsNotEmpty && <span className='today-degree'>{Math.round(weatherInCurrentCity.days[0].tempmax)}°C</span>}/
                                {weatherInCurrentCityIsNotEmpty && <span className='today-degree'>{Math.round(weatherInCurrentCity.days[0].tempmin)}°C</span>}
                            </div>
                        </div>
                    </div>
                        {weatherInCurrentCityIsNotEmpty && <img className='today-icon' width={30} height={30} alt={weatherInCurrentCity.days[0].icon} src={`./images/weatherIcons/${weatherInCurrentCity.days[0].icon}.svg`}></img>}
                        <div className='today-counter'>
                            <p className='today-counter-text'>The trip will start in:</p>
                            <CounterOfDays />
                        </div></>
                }



            </div>
        </>
    )
}

export default WeatherToday;