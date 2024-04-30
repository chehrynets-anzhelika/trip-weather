import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';
import styles from "./headerbutton.module.css";

const HeaderButton = (props) => {

    return (
        <OutsideClickHandler onOutsideClick={() => {
            if(!props.arrowDirection) {
                props.setArrowDirection(true);
            }
        }}>
            <div className={styles.sortContainer}>
                <button className={`header-btn ${styles.btn}`} onClick={() => props.setArrowDirection(!props.arrowDirection)}>
                    <span className={styles.content}>{props.title}</span>
                   <FontAwesomeIcon icon={props.arrowDirection ? faCaretDown : faCaretUp} className={styles.btnArrow} />
                </button>
                {!props.arrowDirection && <div className={styles.listContainer}>
                    <ul className={styles.list} onClick={props.clickHandler}>
                        {
                            props.items.map(item => {
                                return (<li className={`${styles.listItem} ${props.checkedItem === item["data-name"] ? styles.checked : ""}`} data-name={item["data-name"]} key={item.value}>{item.value}</li>)
                            })
                        }
                    </ul>
                </div>}
            </div>
        </OutsideClickHandler>
    );
}

export default HeaderButton;
