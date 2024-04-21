import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearFilterData, filterData, unSelectedCard } from '../../store/dataSlice';
import { saveSearchValue } from '../../store/searchSlice';
import { deleteSelectTrip } from '../../store/tripSlice';
import { clearCurrentForecast } from '../../store/forecastSlice';


const Search = () => {
    let dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const searchValue = useSelector(state => state.search.searchValue);

    const searchHandler = (e) => {
        dispatch(deleteSelectTrip());
        dispatch(unSelectedCard());
        dispatch(clearCurrentForecast());
        dispatch(saveSearchValue(e.target.value));
        dispatch(filterData(e.target.value));
        setInputValue(e.target.value);
        if(e.target.value === ""){
            dispatch(clearFilterData());
        }
    }

    return (
        <>
            <div className={styles.wrap}>
                <input placeholder='Search your trip' autoComplete='off' className={styles.search} onChange={searchHandler} value={searchValue}>
                </input>
                <div className={`${styles.iconWrap} ${!inputValue ? styles.opacity : styles.notopacity}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
            </div>
        </>
    );
}

export default Search;
