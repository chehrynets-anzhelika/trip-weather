import React from 'react';
import AddTrip from '../AddTrip/addTrip';
import "./header.css";


const Header = () => {
    return (
        <>
        <header className='header'>
        <div className='container'>
        <nav className='header-nav'>
             <a href='/' className='header-logo'>Weather Forecast</a>
             <AddTrip/>
        </nav>
        </div>
        </header>
        </>
        
    );
}

export default Header;
