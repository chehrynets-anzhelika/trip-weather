import React, { useState } from "react";
import styles from "./sort.module.css";
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
            <div className={styles.sortContainer}>
                <button className={`header-btn ${styles.btn}`} onClick={() => setArrowDirection(!arrowDirection)}>
                    <span>Sort</span>
                    <FontAwesomeIcon icon={arrowDirection ? faCaretDown : faCaretUp} className={styles.btnArrow} />
                </button>
                {!arrowDirection && <div className={styles.listContainer}>
                    <ul className={styles.list} onClick={sortClickHandler}>
                        {
                            sortItems.map(item => {
                                return (<li className={`${styles.listItem} ${checkedSortItem === item["data-name"] ? styles.checked : ""}`} data-name={item["data-name"]} key={item.value}>{item.value}</li>)
                            })
                        }
                    </ul>
                </div>}

            </div>
        </OutsideClickHandler>

    )
}

export default Sort;