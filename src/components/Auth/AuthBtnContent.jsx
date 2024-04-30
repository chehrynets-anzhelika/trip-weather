import React, { useState, useEffect } from 'react';
import HeaderButton from '../HeaderButton/HeaderButton';
import styles from "./auth.module.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/googleAuthSlice';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';
import { clearData, unSelectedCard } from '../../store/dataSlice';
import { clearCurrentForecast } from '../../store/forecastSlice';
import { deleteSelectTrip } from '../../store/tripSlice';

const AuthBtnContent = (props) => {
    const [checkedItem, setCheckedItem] = useState("");
    const [isAuthProvider, setIsAuthProvider] = useState(false);
    const [arrowDirection, setArrowDirection] = useState(true);
    const dispatch = useDispatch();

    const isGoogleUser = useSelector(state => state.googleUser.userName);

    useEffect(() => {
        if(isGoogleUser != null) {
            setIsAuthProvider(true);
        } else {
            setIsAuthProvider(false);
        }
    }, [isGoogleUser]);

    const items = [
        {
            "data-name": "logout",
            value: "Log Out"
        },

    ]

    const handleLogOut = async() => {
        try{
            await signOut(auth);
            setArrowDirection(!arrowDirection);
        } catch(e) {
            console.error(e);
        }
    }

    const sortHandler = (e) => {
        setCheckedItem(e.target.getAttribute("data-name"));
        handleLogOut();
        dispatch(deleteUser());
        dispatch(clearData());
        dispatch(clearCurrentForecast());
        dispatch(unSelectedCard());
        dispatch(deleteSelectTrip());
    }
   
    return (
        <>
         {
            isAuthProvider ? <HeaderButton
                title={isGoogleUser}
                arrowDirection={arrowDirection}
                setArrowDirection={setArrowDirection}
                items={items}
                clickHandler={sortHandler}
                checkedItem={checkedItem} /> 
                :                
            <div onClick={props.onClick}>
                <button className={`header-btn ${styles.btn}`} >
                    <span>Login</span>
                </button>
            </div>
         }               
        </>        
    );
}

export default AuthBtnContent;
