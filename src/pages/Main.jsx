import React from 'react';
import Modal from '../components/Modal/modal';
import Search from '../components/Search/search';
import TripList from '../components/TripList/tripList';

const Main = () => {
    return (
        <>
            <header>
                <h1>Weather Forecast</h1>
            </header>
            <Search />
            <main>
                <TripList />
                <Modal/>
            </main>

        </>
    );
}

export default Main;
