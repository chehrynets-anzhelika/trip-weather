import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CounterOfDays from '../CounterOfDays/CounterOfDays';
import styles from "./weatherToday.module.css";
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

    const error = useSelector(state => state.weatherToday.error);

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
            <div className={`${styles.wrap} ${currentCard ? styles.visible : ""}`}>
                {
                    loading ? <WeatherTodayLoader className={styles.loader} width={280} height={180} /> : <><div className={styles.info}>
                       {currentCard && <p className={styles.day}>{getDayOfWeek(dateTime)}</p>}
                       {currentCard && <p className={styles.city}>{currentCard.city.city}</p>}
                        <div>{error ? <span>Not available</span> : <div className={styles.degreesWrap}>
                                {weatherInCurrentCityIsNotEmpty && <span className={styles.degree}>{Math.round(weatherInCurrentCity.days[0].tempmax)}°C</span>}/
                                {weatherInCurrentCityIsNotEmpty && <span className={styles.degree}>{Math.round(weatherInCurrentCity.days[0].tempmin)}°C</span>}
                            </div>}
                        </div>
                    </div>
                       {
                        error ? null : (weatherInCurrentCityIsNotEmpty && <img className={styles.icon} width={30} height={30} alt={weatherInCurrentCity.days[0].icon} src={`./images/weatherIcons/${weatherInCurrentCity.days[0].icon}.svg`}></img>)
                       } 
                        <div className={styles.counter}>
                            <p className={styles.counterText}>The trip will start in:</p>
                            <CounterOfDays />
                        </div></>
                }
            </div>
        </>
    )
}

export default WeatherToday;