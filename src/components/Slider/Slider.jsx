import React, { useState, useEffect } from 'react';
import "./slider.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import NextButton from '../NextButton/NextButton';

const CARDWIDTH = 33.33;

const Slider = ({ children, cards }) => {
    const [offset, setOffset] = useState(0);
    const [isLeftArrow, setIsLeftArrow] = useState(false);
    const [isRightArrow, setIsRightArrow] = useState(false);

    useEffect(() => {
        setIsRightArrow(cards.length > 3)
    }, [cards.length]);

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
        <div className='slider-container'>
            {isLeftArrow && <NextButton onClick={previousSlide} direction={faChevronLeft} position={`next-button-left ${isLeftArrow ? "visible" : "hidden"}`}></NextButton>}
            <div className='window'>
                <div className='all-card-container'
                    style={{ transform: `translateX(${offset}%)` }}>
                    {
                        children
                    }
                </div>
            </div>
            {isRightArrow && <NextButton onClick={nextSlide} direction={faChevronRight} position={`next-button-right ${isRightArrow ? "visible" : "hidden"}`}></NextButton>}
        </div>
    );
}

export default Slider;
