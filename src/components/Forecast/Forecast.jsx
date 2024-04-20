import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import styles from "./forecast.module.css";
import { getForecast } from '../../store/forecastSlice';

const Forecast = () => {

  const currentCard = useSelector(state => state.currentTrip.current);
  const forecastDays = useSelector(state => state.forecast.currentForecast.days);
  const error = useSelector(state => state.forecast.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCard) {
      dispatch(getForecast({
        city: currentCard.city.city,
        country: currentCard.city.country,
        dateStart: currentCard.startDate,
        dateEnd: currentCard.endDate
      }));
    }
  }, [currentCard, dispatch])

  return (
    <>
      <div className={`${styles.forecastContainer} ${currentCard ? `${styles.active}` : ""}`}>
        {
          error ? <p className={styles.errorMessage}>Sorry, we can't set the weather forecast for this location</p> :
            <ul className={styles.list}>
              {forecastDays?.map((day) => (
                <li key={day.datetimeEpoch} className={styles.item}>
                  <div>
                    <span className={styles.date}>{day.datetime.slice(-2)}</span>
                    <span className={styles.date}>/</span>
                    <span className={styles.date}>{day.datetime.slice(5, 7)}</span>
                  </div>
                  <p>{getDayOfWeek(day.datetime)}</p>
                  <img src={`/images/weatherIcons/${day.icon}.svg`} alt={`${day.icon}`} width={30} height={30}></img>
                  <div className={styles.tempWrap}>
                    <span>{Math.round(day.tempmax)}°C</span>
                    <span>{Math.round(day.tempmin)}°C</span>
                  </div>
                </li>
              ))}
            </ul>
        }


      </div>

    </>

  );
}

export default Forecast; 
