import React from 'react';
import "./tripItem.css";

const TripItem = (props) => {
    return (
        <div>
            <img src='#' alt="city-image"></img>
            <p>{props.city}</p>
            <time>{props.startDate} - {props.endDate}</time>
        </div>
    );
}

export default TripItem;
