import React from 'react';
import "./tripItem.css"

const TripItem = (props) => {
    return (
        (props.img && props.name && props.date) ? <div className='trip-card'>
            <img src={props.img} alt="trip" width={200} height={200}></img>
            <p>{props.name}</p>
            <p>{props.date}</p>
        </div> : 
        <div className='trip-card-add'>
            <span> + </span>
            <p>Add trip</p>
        </div>
    );
}

export default TripItem;
