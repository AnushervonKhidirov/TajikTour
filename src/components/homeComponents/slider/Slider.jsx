import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SliderContext } from '../../../Context';
import './slider.css';

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

  useEffect(() => {
    const thumbsClasses = [];

    for (let i = 0; i <= slideLength; i++) {
      i === currentSlide ? thumbsClasses.push('active') : thumbsClasses.push('');
    }

    setactiveSlide(thumbsClasses)
  }, [currentSlide, slideLength]);
  
  function sliderHandler(current) {
    if (!isRotate) return;
    
    setIsRotate(false);
    setCurrentSlide(showCurrentSlide(current));
    setTimeout(() => setIsRotate(true), 1000);
  }

  function showCurrentSlide(current) {
    if (current > slideLength) current = 0;
    if (current < 0) current = slideLength;
    return current;
  }

  return (
    <SliderContext.Provider value={{ sliderHandler: sliderHandler, currentSlide: currentSlide, activeSlide: activeSlide }}>
      <div className={`slider_wrapper slide-${currentSlide}`}>
        <div className="slides">
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
    <div className={`slide_item slide_item-${index} ${active}`}>
      <div className="slide_img" style={{backgroundImage: `url(./img/${img})`}}></div>

      <div className="slide_date">
        <div>Only until</div>
        <div>{date}</div>
      </div>

      <div className="slide_sale">
        <div className="sale_text">{saleText}</div>
        <Link to={link} className="sale_link"><span>Shop Now</span><div className="link_bg"></div></Link>
      </div>
    </div>
  );
}


function Arrows() {
  const { sliderHandler, currentSlide } = useContext(SliderContext);

  return (
    <div className="slider_arrows">
      <div className="left_arrow slider_arrow" onClick={() => sliderHandler(currentSlide - 1)}></div>
      <div className="right_arrow slider_arrow" onClick={() => sliderHandler(currentSlide + 1)}></div>
    </div>
  );
}

function ThumbsWrapper() {
  const { sliderHandler, activeSlide } = useContext(SliderContext);

  return (
    <div className="slider_thumbs">
      {sliderInner.map((thumb, index) => {
        return <Thumb active={activeSlide[index]} switchSlide={() => sliderHandler(index)} key={'thumb-' + index.toString()} />
      })}
    </div>
  );
}

function Thumb({ active, switchSlide }) {
  return <div className={`thumb_item ${active}`} onClick={switchSlide}></div>
}

export default Slider;