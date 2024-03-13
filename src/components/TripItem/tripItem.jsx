import React from 'react';
import "./tripItem.css";

const TripItem = (props) => {
    return (
        <div>
            <img src={props.cityImage} alt={props.cityName} width="400" height="350"></img>
            <p>{props.city}</p>
            <time>{props.startDate} - {props.endDate}</time>
        </div>
    );
}

export default TripItem;
