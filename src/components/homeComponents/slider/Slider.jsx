import React, { useState, useEffect, useContext, useCallback } from 'react';
import { WrapperContext } from '../../../Context';
import { Link } from 'react-router-dom';
import { SliderContext } from '../../../Context';
import styles from './Slider.module.css';

function Slider() {
  const wrapper = useContext(WrapperContext);
  const [sliderInner, setSliderInner] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setactiveSlide] = useState(Array(sliderInner.length));
  const [isRotate, setIsRotate] = useState(true);
  const slideLength = sliderInner.length - 1;
  const autorotateDelay = 5000;

  useEffect(() => {
    import(`./sliderData/${wrapper.lang}`).then(sliderData => setSliderInner(sliderData.sliderData));
  }, [wrapper.lang]);

  useEffect(() => {
    const thumbsClasses = [];

    for (let i = 0; i <= slideLength; i++) {
      i === currentSlide ? thumbsClasses.push(styles.active) : thumbsClasses.push('');
    }

    setactiveSlide(thumbsClasses)
  }, [currentSlide, slideLength]);
  
  let showCurrentSlide = useCallback((current) => {
    if (current > slideLength) current = 0;
    if (current < 0) current = slideLength;
    return current;
  }, [slideLength]);

  let sliderHandler = useCallback((current) => {
    if (!isRotate) return;
    setIsRotate(false);
    setCurrentSlide(showCurrentSlide(current));
    setTimeout(() => setIsRotate(true), 1000);
  }, [showCurrentSlide, isRotate]);

  // autorotate slider
  useEffect(() => {
    const autorotate = setInterval(() => sliderHandler(currentSlide + 1), autorotateDelay);
    return () => clearInterval(autorotate);
  }, [sliderHandler, currentSlide]);

  return (
    <SliderContext.Provider value={{ sliderHandler: sliderHandler, currentSlide: currentSlide, activeSlide: activeSlide }}>
      <div className={styles.slider_wrapper}>
        <div className={styles.slides}>
          {sliderInner.map((slide, index) => {
            return <Slide 
              img={slide.img}
              slideText={slide.slideText}
              slideTitle={slide.slideTitle}
              linkText={slide.linkText}
              link={slide.link}
              index={index}
              active={activeSlide[index]}
              id={slide.slideId}
              key={`slide-${slide.slideId}`} />
            })}
        </div>

        <Arrows />
        <ThumbsWrapper slider={sliderInner} />
      </div>
    </SliderContext.Provider>
  );
}

function Slide({ img, slideText, slideTitle, linkText, link, active, id }) {
  return (
    <div className={`${styles.slide_item} ${active}`} data-id={id}>
      <div className={styles.slide_img} style={{backgroundImage: `url(/img/slider/${img})`}} />

      <div className={styles.slide_title}>{slideTitle}</div>

      <div className={styles.slide_desc}>
        <div className={styles.slide_text}>{slideText}</div>
        <Link to={link} className={styles.slide_link}>{linkText}</Link>
      </div>
    </div>
  );
}


function Arrows() {
  const { sliderHandler, currentSlide } = useContext(SliderContext);

  return (
    <div className="slider_arrows">
      <div className={`${styles.left_arrow} ${styles.slider_arrow}`} onClick={() => sliderHandler(currentSlide - 1)} />
      <div className={`${styles.right_arrow} ${styles.slider_arrow}`} onClick={() => sliderHandler(currentSlide + 1)} />
    </div>
  );
}

function ThumbsWrapper({ slider }) {
  const { sliderHandler, activeSlide } = useContext(SliderContext);

  return (
    <div className={styles.slider_thumbs}>
      {slider.map((thumb, index) => {
        return <Thumb active={activeSlide[index]} switchSlide={() => sliderHandler(index)} key={'thumb-' + index.toString()} />
      })}
    </div>
  );
}

function Thumb({ active, switchSlide }) {
  return <div className={`${styles.thumb_item} ${active}`} onClick={switchSlide} />
}

export default Slider;