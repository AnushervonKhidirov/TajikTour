import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext, DestinationContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './Destination.module.css';

function Destination() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [packagesData, setPackagesData] = useState([]);
  const [bigDestData, setBigDestData] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);
  useEffect(() => import(`../../common/data/packageListData/${wrapper.lang}`).then(packages => {
    let index = 0;
    let smallDest = [[], []];
    let bigDest = {
      inside: {
        location: locales.inside,
        img: 'packages-0.jpg',
        inner: {
          title: locales.packages,
          list: [],
          link: {
            title: locales.linkText,
            href: '/packages'
          },
        }
      },
      outside: {
        location: locales.outside,
        img: 'packages-1.jpg',
        inner: {
          title: locales.packages,
          list: [],
          link: {
            title: locales.linkText,
            href: '/packages'
          }
        }
      }
    };

    packages.packageListData.forEach(packageItem => {
      bigDest[packageItem.location].inner.list.push(packageItem);

      if (packageItem.price && packageItem.location === 'inside' && smallDest[0].length < 3) {
        smallDest[0].push(packageItem);
        index++
      }
      if (packageItem.price && packageItem.location === 'outside' &&  smallDest[1].length < 3) {
        smallDest[1].push(packageItem);
        index++
      }
    });

    setPackagesData(smallDest);
    setBigDestData(bigDest);
  }), [wrapper.lang, locales]);

  return (
    <DestinationContext.Provider value={locales}>
      <div className='block_item'>
        <Headline title={locales.ourDestinations} />

        <div className={styles.destinations}>
          {Object.keys(bigDestData).map((loc, index) => {
            return <DestinationItem bigDest={bigDestData[loc]} smallDest={packagesData[index]} key={'destination-' + index} />
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
      {smallDest && smallDest.map(smallDest => {
        return <DestinationSmallPackage dest={smallDest} key={smallDest.key} />
      })}
    </div>
  );
}

function DestinationBigPackage({ dest }) {
  const locales = useContext(DestinationContext);
  const {location, img, inner} = dest;

  return (
    <div className={styles.destination_package} style={{backgroundImage: `url(/img/main_tab/${img})`}}>
      <div className={styles.text}>
        <div className={styles.location}>{location}</div>
        <div className={styles.packages}>{locales.packages}: {inner.list.length}</div>
      </div>

      <div className={styles.destination_inner}>
        <h3 className={styles.title}>{inner.title}</h3>
        <ul>
          {inner.list.map(list => {
            return <Link to={`/packages/${list.key}`} key={list.key}><li>{list.title}</li></Link>
          })}
        </ul>

        <Link to='/packages' className={styles.link}>{locales.linkText}</Link>
      </div>
    </div>
  );
}

function DestinationSmallPackage({ dest }) {
  const { img, title, price, key } = dest;

  return (
    <div className={styles.destination_list_item}>
      <div className={styles.destination_img_wrapper}>
        <div className={styles.destination_img} style={{backgroundImage: `url(/img/packages/${img})`}} />
      </div>

      <div className={styles.destination_desc}>
        <h3 className={styles.title}>{title}</h3>
        <Link to={`/packages/${key}`} className={styles.link}>{price} $</Link>
      </div>
    </div>
  );
}

export default Destination;