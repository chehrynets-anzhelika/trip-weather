import React from 'react';
import { useSelector } from 'react-redux';
import Forecast from '../Forecast/Forecast';
import Search from '../Search/search';
import TripList from '../TripList/tripList';
import WeatherToday from '../WeatherToday/weatherToday';
import Modal from '../Modal/modal';
import "./main.css"

const Main = () => {

const currentTrip = useSelector(state => state.currentTrip.current); 
const modal = useSelector(state => state.modal.isOpen);

    return (
        <main className='main'>
            <section className='start-wrap'>
                <div className='start'></div>
                <Search />
            </section>
            <section className='section-cards'>
                <div className='container'>
                   <TripList />
                </div>
            </section>
            {currentTrip && <section>
            <div className='container'>
                 <WeatherToday />
            </div>
            </section>}
                {currentTrip && <section>
                    <div className='container'>
                         <Forecast />
                    </div>
                </section>}
                {modal && <section>
                    <div className='container'><Modal /></div>
                </section>}  
        </main>
    );
}

export default Main;
