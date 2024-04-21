import React, { useState, useEffect } from 'react';
import styles from "./slider.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import NextButton from '../NextButton/NextButton';
import stylesbuttons from "../NextButton/nextbutton.module.css";
import { useSelector } from 'react-redux';

const CARDWIDTH = 33.33;

const Slider = ({ children, cards }) => {
    const [offset, setOffset] = useState(0);
    const [isLeftArrow, setIsLeftArrow] = useState(false);
    const [isRightArrow, setIsRightArrow] = useState(false);

    let searchValue = useSelector(state => state.search.searchValue);

    useEffect(() => {
        setIsRightArrow(cards.length > 3)
    }, [cards.length]);

    useEffect(() => {
        if(searchValue) {
            setOffset(0);
            setIsLeftArrow(false);
            setIsRightArrow(cards.length > 3);
        }
    }, [searchValue]);

    useEffect(() => {
        setIsLeftArrow(offset < 0);
        setIsRightArrow(offset > -CARDWIDTH * (cards.length - 3));
    }, [cards.length, offset]);

    const nextSlide = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset - CARDWIDTH;
            const maxOffset = -CARDWIDTH * (cards.length - 3);
            const updatedOffset = Math.max(newOffset, maxOffset);
            setIsLeftArrow(updatedOffset < 0);
            setIsRightArrow(updatedOffset > maxOffset);
            return updatedOffset;
        });

    }

    const previousSlide = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset + CARDWIDTH;
            const updatedOffset = Math.min(newOffset, 0);
            setIsLeftArrow(updatedOffset < 0);
            setIsRightArrow(updatedOffset < CARDWIDTH * (cards.length - 3));
            return updatedOffset;
        })
    }

    return (
        <div className={styles.sliderContainer}>
            {isLeftArrow && <NextButton onClick={previousSlide} direction={faChevronLeft} position={`${stylesbuttons.buttonLeft} ${isLeftArrow ? stylesbuttons.visible : stylesbuttons.hidden}`}></NextButton>}
            <div className={styles.window}>
                <div className={styles.allCardContainer}
                    style={{ transform: `translateX(${offset}%)` }}>
                    {
                        children
                    }
                </div>
            </div>
            {isRightArrow && <NextButton onClick={nextSlide} direction={faChevronRight} position={`${stylesbuttons.buttonRight} ${isRightArrow ? stylesbuttons.visible : stylesbuttons.hidden}`}></NextButton>}
        </div>
    );
}

export default Slider;
