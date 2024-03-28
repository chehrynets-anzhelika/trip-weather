import React from 'react';
import Forecast from '../Forecast/Forecast';
import Search from '../Search/search';
import TripList from '../TripList/tripList';
import WeatherToday from '../WeatherToday/weatherToday';
import Modal from '../Modal/modal';
import "./main.css"

const Main = () => {
    return (
        <main className='main'>
            <section className='start-wrap'>
                <div className='start'></div>
                <Search />
            </section>
            <section>
                <div className='container'>
                   <TripList />
                </div>
            </section>
            <section>
            <div className='container'>
                 <WeatherToday />
            </div>
            </section>
                <section>
                    <div className='container'>
                         <Forecast />
                    </div>
                </section>
                <section>
                    <div className='container'><Modal /></div>
                </section>  
        </main>
    );
}

export default Main;
