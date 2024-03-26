import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useDispatch } from "react-redux";
import { filterData } from '../../store/dataSlice';
import { saveSearchValue } from '../../store/searchSlice';


const Search = () => {
    let dispatch = useDispatch();
    
    const searchHandler = (e) => {
       dispatch(saveSearchValue(e.target.value));
       dispatch(filterData(e.target.value));
    }

    return (
        <>
        <div>
            <input placeholder='Search your trip' className='search' onChange={searchHandler}></input>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        </>
    );
}

export default Search;
