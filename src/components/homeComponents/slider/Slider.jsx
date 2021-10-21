import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SliderContext } from '../../../Context';
import styles from './Slider.module.css';

const sliderInner = [
  {
    img: 'slide-0.jpg',
    saleText: 'Package Sale -50%',
    date: '10.01.21',
    link: '/pakcages'
  },
  {
    img: 'slide-1.jpg',
    saleText: 'Package Sale -50%',
    date: '10.01.21',
    link: '/pakcages'
  },
  {
    img: 'slide-2.jpg',
    saleText: 'Package Sale -50%',
    date: '10.01.21',
    link: '/pakcages'
  }
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setactiveSlide] = useState(Array(sliderInner.length));
  const [isRotate, setIsRotate] = useState(true);
  const slideLength = sliderInner.length - 1;
  const autorotateDelay = 5000;

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
              saleText={slide.saleText} 
              date={slide.date} 
              link={slide.link} 
              index={index} 
              active={activeSlide[index]} 
              key={`slide-${index}`} />
            })}
        </div>

        <Arrows />
        <ThumbsWrapper />
      </div>
    </SliderContext.Provider>
  );
}

function Slide({ img, saleText, date, link, index, active }) {
  return (
    <div className={`${styles.slide_item} ${active}`}>
      <div className={styles.slide_img} style={{backgroundImage: `url(/img/slider/${img})`}} />

      <div className={styles.slide_date}>
        <div>Only until</div>
        <div>{date}</div>
      </div>

      <div className={styles.slide_sale}>
        <div className={styles.sale_text}>{saleText}</div>
        <Link to={link} className={styles.sale_link}>Shop Now</Link>
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

function ThumbsWrapper() {
  const { sliderHandler, activeSlide } = useContext(SliderContext);

  return (
    <div className={styles.slider_thumbs}>
      {sliderInner.map((thumb, index) => {
        return <Thumb active={activeSlide[index]} switchSlide={() => sliderHandler(index)} key={'thumb-' + index.toString()} />
      })}
    </div>
  );
}

function Thumb({ active, switchSlide }) {
  return <div className={`${styles.thumb_item} ${active}`} onClick={switchSlide} />
}

export default Slider;