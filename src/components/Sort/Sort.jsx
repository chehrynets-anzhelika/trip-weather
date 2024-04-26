import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSortValue } from "../../store/sortSlice";
import HeaderButton from "../HeaderButton/HeaderButton";

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
        <HeaderButton 
        title="Sort"
        arrowDirection={arrowDirection}
        setArrowDirection={setArrowDirection}
        items={sortItems}
        clickHandler={sortClickHandler}
        checkedItem={checkedSortItem}
        />)
}

export default Sort;