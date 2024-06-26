import React from 'react';
import { useSelector } from 'react-redux';
import Forecast from '../Forecast/Forecast';
import Search from '../Search/Search';
import TripList from '../TripList/TripList';
import WeatherToday from '../WeatherToday/WeatherToday';
import Modal from '../Modal/Modal';
import styles from "./main.module.css"

const Main = () => {

const currentTrip = useSelector(state => state.currentTrip.current); 
const modal = useSelector(state => state.modal.isOpen);

    return (
        <main className='main'>
            <section className={styles.wrap}>
                <div className={styles.start}></div>
                <div className={styles.info}>
                    <Search />
                    {currentTrip && <section>
            <div className='container'>
                 <WeatherToday />
            </div>
            </section>}
                </div>
                
            </section>
            <section className={styles.sectionCards}>
                <div className='container'>
                   <TripList />
                </div>
            </section>
            
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
