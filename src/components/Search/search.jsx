import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useDispatch } from "react-redux";
import { filterData } from '../../store/dataSlice';
import { saveSearchValue } from '../../store/searchSlice';


const Search = () => {
    let dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");

    const searchHandler = (e) => {
        dispatch(saveSearchValue(e.target.value));
        dispatch(filterData(e.target.value));
        setInputValue(e.target.value);
    }

    return (
        <>
            <div className='search-wrap'>
                <input placeholder='Search your trip' autoComplete='off' className='search' onChange={searchHandler}>
                </input>
                <div className={`search-icon-wrap ${!inputValue ? "search-icon-wrap--opacity" : "search-icon-wrap--notopacity"}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                </div>
            </div>
        </>
    );
}

export default Search;
