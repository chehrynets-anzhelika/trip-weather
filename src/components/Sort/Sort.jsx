import React, { useState } from "react";
import "./sort.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { saveSortValue } from "../../store/sortSlice";
import OutsideClickHandler from 'react-outside-click-handler';

const Sort = () => {
    const [arrowDirection, setArrowDirection] = useState(true);
    const dispatch = useDispatch();
    const checkedSortItem = useSelector(state => state.sort.sortValue);
    const sortItems = [
        {
            "data-name": "creation",
            value: "by order of creation"
        },
        {
            "data-name": "earliest",
            value: "by earliest date"
        },
        {
            "data-name": "latest",
            value: "by latest date"
        },
    ]


    const sortClickHandler = (e) => {
        dispatch(saveSortValue(e.target.getAttribute("data-name")));

    }
    return (
        <OutsideClickHandler onOutsideClick={() => {
            if(!arrowDirection) {
                setArrowDirection(true);
            }
        }}>
            <div className="sort-container">
                <button className="header-btn sort-btn" onClick={() => setArrowDirection(!arrowDirection)}>
                    <span>Sort</span>
                    <FontAwesomeIcon icon={arrowDirection ? faCaretDown : faCaretUp} className="sort-btn-arrow" />
                </button>
                {!arrowDirection && <div className="list-container">
                    <ul className="sort-list" onClick={sortClickHandler}>
                        {
                            sortItems.map(item => {
                                return (<li className={`sort-list-item ${checkedSortItem === item["data-name"] ? "checked" : ""}`} data-name={item["data-name"]} key={item.value}>{item.value}</li>)
                            })
                        }
                    </ul>
                </div>}

            </div>
        </OutsideClickHandler>

    )
}

export default Sort;