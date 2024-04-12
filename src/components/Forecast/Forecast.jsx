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
  <>
    <div className='forecast-container'>
<ul className="forecast-list">
           { data.days?.map((day) => (
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
    </div>
    
  </>
        
    );
}

export default Forecast; 
