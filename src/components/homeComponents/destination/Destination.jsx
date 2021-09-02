import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext, DestinationContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './Destination.module.css';

function Destination() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const destinationData = [
    {
      bigDest: {
        location: locales.asia,
        packagesLength: 2,
        img: 'packages-0.jpg',
        inner: {
          title: locales.packages,
          list: [
            {
              title: locales.boraBora,
              href: '/packages'
            },
            {
              title: locales.phuket,
              href: '/packages'
            }
          ],
          link: {
            title: locales.linkText,
            href: ''
          }
        }
      },
      smallDest: [
        {
          img: 'destination-0.jpg',
          title: locales.kohSamui,
          location: locales.europe,
          price: 700
        },
        {
          img: 'destination-1.jpg',
          title: locales.boraBora,
          location: locales.asia,
          price: 500
        },
        {
          img: 'destination-2.jpg',
          title: locales.maldives,
          location: locales.oceania,
          price: 400
        }
      ]
    },
    {
      bigDest: {
        location: locales.europe,
        packagesLength: 3,
        img: 'packages-1.jpg',
        inner: {
          title: locales.packages,
          list: [
            {
              title: locales.kohSamui,
              href: '/packages'
            },
            {
              title: locales.seychelles,
              href: '/packages'
            },
            {
              title: locales.hawaii,
              href: '/packages'
            }
          ],
          link: {
            title: locales.linkText,
            href: ''
          }
        }
      },
      smallDest: [
        {
          img: 'destination-3.jpg',
          title: locales.hawaii,
          location: locales.italy,
          price: 730
        },
        {
          img: 'destination-4.jpg',
          title: locales.seychelles,
          location: locales.netherlands,
          price: 1500
        },
        {
          img: 'destination-5.jpg',
          title: locales.phuket,
          location: locales.thailandia,
          price: 1200
        }
      ]
    }
  ];

  return (
    <DestinationContext.Provider value={locales}>
      <div className={`${styles.destination_block} block_item`}>
        <Headline title={locales.ourDestinations} />

        <div className={styles.destinations}>
          {destinationData.map((dest, index) => {
            return <DestinationItem bigDest={dest.bigDest} smallDest={dest.smallDest} key={'destination-' + index} />
          })}
        </div>
      </div>
    </DestinationContext.Provider>
  );
}

function DestinationItem({ bigDest, smallDest }) {

  return (
    <div className={styles.destination_item}>
      <DestinationBigPackage dest={bigDest} />
      {smallDest.map((smallDest, index) => {
        return <DestinationSmallPackage dest={smallDest} key={smallDest.title + index.toString()} />
      })}
    </div>
  );
}

function DestinationBigPackage({ dest }) {
  const locale = useContext(DestinationContext);
  const {location, packagesLength, img, inner} = dest;

  return (
    <div className={styles.destination_package} style={{backgroundImage: `url(/img/main_tab/${img})`}}>
      <div className={styles.text}>
        <div className={styles.location}>{location}</div>
        <div className={styles.packages}>{locale.packages}: {packagesLength}</div>
      </div>

      <div className={styles.destination_inner}>
        <h3 className={styles.title}>{inner.title}</h3>
        <ul>
          {inner.list.map((list, index) => {
            return <Link to={list.href} key={list.title + index.toString()}><li>{list.title}</li></Link>
          })}
        </ul>

        <Link to={inner.link.href} className={styles.link}>{inner.link.title}</Link>
      </div>
    </div>
  );
}

function DestinationSmallPackage({ dest }) {
  const locale = useContext(DestinationContext);
  const { img, title, location, price } = dest;

  return (
    <div className={styles.destination_list_item}>
      <div className={styles.destination_img} style={{backgroundImage: `url(/img/destinations/${img})`}} />
      <div className={styles.destination_desc}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.location}>{location}</div>
        <div className={styles.link}>{locale.from} {price} $</div>
      </div>
    </div>
  );
}

export default Destination;