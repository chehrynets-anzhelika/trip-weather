import React from 'react';
import TripItem from '../TripItem/tripItem';
import { useSelector } from "react-redux";
import "./tripList.css";
import Slider from "../Slider/Slider";


const TripList = () => {
    const trips = useSelector(state => state.data.trips);
    const filteredTrips = useSelector(state => state.data.filteredTrips);
    const searchValue = useSelector(state => state.search.searchValue);
    const displayTrips = !searchValue ? trips : filteredTrips;
    


    return (
        <>
            {!trips.length ? <p className='message-card'>You haven’t created any trips yet</p> : <Slider cards={displayTrips}>
                 {displayTrips.map((trip, idx) => (
                        <div key={idx} className="card">
                           <TripItem
                                id={trip.city.id}
                                selected={trip.selected}
                                cityImage={trip.cityImage}
                                cityName={trip.city.city}
                                city={trip.city.city}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                                displayTrips={displayTrips} />
                        </div>
                    ))}
            </Slider>}
        </>
    );
}

export default TripList;
