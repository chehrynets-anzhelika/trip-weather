import React from 'react';
import AddTrip from '../AddTrip/AddTrip';
import Auth from '../Auth/Auth';
import Sort from '../Sort/Sort';
import styles from './header.module.css';


const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <div className='container'>
                    <nav className={styles.nav}>
                        <a href='/' className={styles.logo} onClick={(e) => e.preventDefault()}>What's Weather?</a>
                        <div className={styles.navBtnContainer}>
                            <Sort />
                            <Auth />
                            <AddTrip />
                        </div>
                    </nav>
                </div>
            </header>
        </>

    );
}

export default Header;
