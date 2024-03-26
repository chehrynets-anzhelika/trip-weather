import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDayOfWeek } from '../../handlers/getDayOfWeek';
import "./forecast.css";
import fetchForecast from '../../handlers/fetchForecast';

const Forecast = () => {

let currentTrip = useSelector(state => state.currentTrip.current) || {};
let startDate = currentTrip.startDate || null;
let endDate = currentTrip.endDate || null;

const [data, setData] = useState({});

useEffect(() => {
    if(startDate && endDate) {
    let city = currentTrip.city.city;
    let country = currentTrip.city.country;
    fetchForecast(city, country, startDate, endDate)
    .then(response => setData(response))
    .catch(e => console.log(e))
    }
  }, [startDate, endDate]);

    return (
        <ul className="forecast-list">
           { data.days?.map((day) => (
            <li key={day.datetimeEpoch} className="forecast-item">
           <div className='forecast-list-date'>
            <span>{day.datetime.slice(-2)}</span>
            <span>/</span>
            <span>{day.datetime.slice(5, 7)}</span>
           </div> 
            <p>{getDayOfWeek(day.datetime)}</p>
            <img src={`/images/weatherIcons/${day.icon}.svg`} alt={`${day.icon}`} width={30} height={30}></img>
            <div className='forestcast-temp-wrap'>
             <span>{Math.round(day.tempmax)}</span>
             <span>{Math.round(day.tempmin)}</span>
            </div>
            </li>
           ))}
        </ul>
    );
}

export default Forecast;
