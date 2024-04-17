import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import "./forecast.css";
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
      <div className={`forecast-container ${currentCard ? "active" : ""}`}>
        {
          error ? <p className='forecast-error-message'>Sorry, we can't set the weather forecast for this location</p> :
            <ul className="forecast-list">
              {forecastDays?.map((day) => (
                <li key={day.datetimeEpoch} className="forecast-item">
                  <div className='forecast-list-date'>
                    <span className='forecast-date'>{day.datetime.slice(-2)}</span>
                    <span className='forecast-date'>/</span>
                    <span className='forecast-date'>{day.datetime.slice(5, 7)}</span>
                  </div>
                  <p>{getDayOfWeek(day.datetime)}</p>
                  <img src={`/images/weatherIcons/${day.icon}.svg`} alt={`${day.icon}`} width={30} height={30}></img>
                  <div className='forestcast-temp-wrap'>
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
