import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./search.css";


const Search = () => {
    return (
        <>
        <div>
            <input placeholder='Search your trip' className='search'></input>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        </>
    );
}

export default Search;
