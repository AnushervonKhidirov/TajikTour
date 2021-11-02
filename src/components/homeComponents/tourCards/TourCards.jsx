import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import { Star } from '../../common/Icons';
import styles from './TourCards.module.css';

function TourCards() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    import(`./data/${wrapper.lang}`).then(locale => setLocales(locale.locale));
    import(`./data/${wrapper.lang}`).then(data => setTourData(data.tourData));
  }, [wrapper.lang]);

  return (
    <div className='block_item'>
      <Headline title={locales.headline} />

      <div className={styles.tour_cards}>
        {tourData.map(tour => {
          return (
            <ClassesItem
            tour={tour}
            price={tour.price}
            stars={tour.stars}
            title={tour.hotelName}
            desc={tour.desc}
            link={tour.link}
            monthly={locales.monthly}
            key={tour.hotelName} />
          );
        })}
      </div>
    </div>
  );
}


function ClassesItem({ tour, monthly }) {
  return (
    <div className={styles.tour_wrapper}>
      <PriceBlock price={tour.price} monthly={monthly} />
      <HotelBlock hotelName={tour.hotelName} stars={tour.stars} />
      <TourDesc headline={tour.desc.headline} listTitle={tour.desc.listTitle} list={tour.desc.list} />
      <Link to={tour.link.href} className={styles.classes_link}>{tour.link.title}</Link>
    </div>
  );
}


function PriceBlock({ price, monthly }) {
  return (
    <div className={styles.price_block}>
      <div className={styles.price}>{price}<sup>$</sup></div>
      <div className={styles.month}>{monthly}</div>
    </div>
  );
}

function HotelBlock({ hotelName, stars }) {
  return (
    <div className={styles.hotel}>
      <div className={styles.stars}>
        {[...Array(stars)].map((star, index) => {
          return <div className={styles.star_item} key={`star_${index}`}><Star /></div>
        })}
      </div>

      <h3 className={styles.classes_type}>{hotelName}</h3>
    </div>
  );
}


function TourDesc({ headline, listTitle, list = [] }) {
  return (
    <div className={styles.description}>
      <div className={styles.headline}>{headline}</div>

      <div className={styles.list_title}>{listTitle}</div>
      <ul className={styles.list}>
        {list.map((listItem, index) => {
          return <li key={`list_item_${index}`}>{listItem};</li>
        })}
      </ul>
    </div>
  );
}


export default TourCards;