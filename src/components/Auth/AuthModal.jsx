import React, { useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import modalStyles from "../Modal/modal.module.css";
import styles from "./auth.module.css";
import AuthLink from './AuthLink';
import { signInWithPopup } from '@firebase/auth';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../store/googleAuthSlice';

const AuthModal = (props) => {
    const dispatch = useDispatch();

    const handleClose = useCallback((e) => {
        if (e.target === e.currentTarget || e.currentTarget.className === modalStyles.close || e.target.parentElement.tagName === "svg") {
            props.setIsOpenAuthWindow(!props.isOpenAuthWindow);
        }
    }, []);

    const handlerSignInWithGoogle = async() => {
        try{
            const result = await signInWithPopup(auth, googleAuthProvider);
            let credentials = result.user;
            dispatch(saveUser({displayName: credentials.displayName, uid: credentials.uid}));
            if(credentials) {
                props.setIsOpenAuthWindow(!props.isOpenAuthWindow);
            }
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className={modalStyles.modal} onClick={handleClose}>
            <form className={`${modalStyles.content} ${styles.content}`}>
                <div className={modalStyles.header}>
                    <h2 className={modalStyles.title}>Sign in to What's Weather</h2>
                    <FontAwesomeIcon className={modalStyles.close} icon={faXmark} onClick={handleClose} />
                </div>
                <div className={modalStyles.body}>
                    <AuthLink src="google.svg" title="Sign in with Google" onClick={handlerSignInWithGoogle}/>
                </div>
            </form>
        </div>
    );
}

export default AuthModal;
