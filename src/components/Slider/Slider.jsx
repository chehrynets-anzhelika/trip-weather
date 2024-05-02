import React, { useState, useEffect, useRef } from 'react';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import NextButton from '../NextButton/NextButton';
import styles from "./slider.module.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

const MySlider = ({children}) => {
  const currentSlider = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    !children.length ? setLoading(false) : setLoading(true);
  }, [children]);

  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextButton direction={faChevronRight} position="right" />,
    prevArrow: <NextButton direction={faChevronLeft} position="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false
        }
      }
    ]
  });

  useEffect(() => {
    console.log(children.length, currentSlider.current);
  }, [children]);

    return (
      <>
        {
         !loading ? <p>loading</p> : <div className={`slider-container ${styles.slider}`} >
            <Slider {...sliderSettings} ref={currentSlider}>
               { children }
            </Slider>
        </div>
      } 
      </>
    );
}

export default MySlider;
