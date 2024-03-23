import React from 'react';
import Modal from '../components/Modal/modal';
import Search from '../components/Search/search';
import TripList from '../components/TripList/tripList';
import WeatherToday from '../components/WeatherToday/weatherToday';

const Main = () => {
    return (
        <>
            <header>
                <h1>Weather Forecast</h1>
            </header>
            <Search />
            <main>
            <div className='main'>
                <TripList />
                <WeatherToday/>
                <Modal/>
            </div>
                
            </main>

        </>
    );
}

export default Main;
