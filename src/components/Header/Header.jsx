import React from 'react';
import AddTrip from '../AddTrip/AddTrip';
import Sort from '../Sort/Sort';
import  styles  from './header.module.css';


const Header = () => {
    return (
        <>
        <header className={styles.header}>
        <div className='container'>
        <nav className={styles.nav}>
             <a href='/' className={styles.logo} onClick={(e) => e.preventDefault()}>Weather Forecast</a>
             <div className={styles.navBtnContainer}>
                <Sort/>
                <AddTrip/>
             </div>
        </nav>
        </div>
        </header>
        </>
        
    );
}

export default Header;
