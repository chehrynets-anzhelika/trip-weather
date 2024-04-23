import React, { useState } from 'react';
import AuthModal from './AuthModal';
import AuthBtnContent from './AuthBtnContent';


const Auth = () => {
    const [isOpenAuthWindow, setIsOpenAuthWindow] = useState(false);

    const showAuthWindow = () => {
        setIsOpenAuthWindow(!isOpenAuthWindow);
    }

    return (
        <>
            <AuthBtnContent
                setIsOpenAuthWindow={setIsOpenAuthWindow}
                onClick={showAuthWindow}
            />
            {isOpenAuthWindow && <AuthModal
                isOpenAuthWindow={isOpenAuthWindow}
                setIsOpenAuthWindow={setIsOpenAuthWindow}
            />}
        </>
    );
}

export default Auth;
