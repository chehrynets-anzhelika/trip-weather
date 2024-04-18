import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { clearFilterData, filterData } from '../../store/dataSlice';
import { saveSearchValue } from '../../store/searchSlice';
import { deleteSelectTrip } from '../../store/tripSlice';
import { clearCurrentForecast } from '../../store/forecastSlice';


const Search = () => {
    let dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const searchValue = useSelector(state => state.search.searchValue);

    const searchHandler = (e) => {
        dispatch(deleteSelectTrip());
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
            <div className='search-wrap'>
                <input placeholder='Search your trip' autoComplete='off' className='search' onChange={searchHandler} value={searchValue}>
                </input>
                <div className={`search-icon-wrap ${!inputValue ? "search-icon-wrap--opacity" : "search-icon-wrap--notopacity"}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                </div>
            </div>
        </>
    );
}

export default Search;
