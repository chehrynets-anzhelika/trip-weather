import React, { useState, useEffect } from 'react';
import TripItem from '../TripItem/tripItem';
import { useSelector } from "react-redux";
import "./tripList.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import NextButton from '../NextButton/NextButton';

const TripList = () => {
    const trips = useSelector(state => state.data.trips);
    const filteredTrips = useSelector(state => state.data.filteredTrips);
    const searchValue = useSelector(state => state.search.searchValue);
    const displayTrips = !searchValue ? trips : filteredTrips;

    const [currentIdx, setCurrentIdx] = useState(0);
    const [isLeftArrow, setIsLeftArrow] = useState(false);
    const [isRightArrow, setIsRightArrow] = useState(false);

    useEffect(() => {
        setIsRightArrow(displayTrips.length > 3);
        setIsLeftArrow(false);
    }, [displayTrips.length]);

    const nextSlide = () => {
        if (currentIdx < displayTrips.length - 3) {
            setCurrentIdx(currentIdx + 1);
            setIsLeftArrow(true);
        }
        if(currentIdx >= displayTrips.length - 4) {
            setIsRightArrow(false);
        }
        return currentIdx;
    }

    const previousSlide = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
            setIsRightArrow(true);
        }
        if(currentIdx <= 1) {
            setIsLeftArrow(false);
        }
    }

    return (
        <>
            <div className='trip-card-wrap'>
                {isLeftArrow && <NextButton onClick={previousSlide} direction={faChevronLeft} position={`next-button-left ${isLeftArrow ? "visible" : "hidden"}`}></NextButton>}
                {isRightArrow && <NextButton onClick={nextSlide} direction={faChevronRight} position={`next-button-right ${isRightArrow ? "visible" : "hidden"}`}></NextButton>}
                <ul className='trip-list'>
                    {displayTrips.slice(currentIdx, currentIdx + 3).map((trip, idx) => (
                        <li key={idx}>
                            <TripItem
                                id={trip.city.id}
                                selected={trip.selected}
                                cityImage={trip.cityImage}
                                cityName={trip.city.city}
                                city={trip.city.city}
                                startDate={trip.startDate}
                                endDate={trip.endDate} />
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}

export default TripList;
