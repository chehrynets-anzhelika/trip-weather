import React from 'react';
import styles from "./auth.module.css";

const AuthLink = (props) => {
    return (
        <a className={styles.link} onClick={() => props.onClick()}>
                   <img src={`images/icons/${props.src}`} width={25} height={25} className={styles.linkIcon}/>
                   <p className={styles.linkText}>{props.title}</p>
                </a>
    );
}

export default AuthLink;
