import React from 'react';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import NextButton from '../NextButton/NextButton';
import styles from "./slider.module.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

const MySlider = ({children}) => {
    
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextButton direction={faChevronRight} position="right"/>,
        prevArrow: <NextButton direction={faChevronLeft} position="left"/>,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1.2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1.1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <div className={`slider-container ${styles.slider}`}>
            <Slider {...settings}>
                {
                    children
                }
            </Slider>
        </div>
    );
}

export default MySlider;
