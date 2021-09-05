import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext } from '../../../Context';
import { Link } from 'react-router-dom';
import styles from './PackageList.module.css'

function PackageList() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const packagesData = [
    {
      key: 'koh_samui',
      img: 'koh_samui.jpg',
      title: locales.kohSamui,
      location: locales.europe,
      typologies: [locales.cultural, locales.relax],
      price: 700,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'bora_bora',
      img: 'bora_bora.jpg',
      title: locales.boraBora,
      location: locales.asia,
      typologies: [locales.history, locales.cultural],
      sale: true,
      wasPrice: 700,
      price: 500,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'maldives',
      img: 'maldives.jpg',
      title: locales.maldives,
      location: locales.oceania,
      typologies: [locales.sport, locales.relax],
      price: 400,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'phuket',
      img: 'phuket.jpg',
      title: locales.phuket,
      location: locales.thailandia,
      typologies: [locales.relax, locales.cultural],
      price: 1200,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'seychelles',
      img: 'seychelles.jpg',
      title: locales.seychelles,
      location: locales.netherlands,
      typologies: [locales.history, locales.sport],
      price: 1500,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'hawaii',
      img: 'hawaii.jpg',
      title: locales.hawaii,
      location: locales.italy,
      typologies: [locales.sport, locales.relax],
      sale: true,
      wasPrice: 950,
      price: 730,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    }
  ]

  return (
    <div className={styles.packages_wrapper}>
      {packagesData.map(packageItem => {
        return <Package packageData={packageItem} locale={locales} key={packageItem.key} />
      })}
    </div>
  );
}

function Package({ packageData, locale }) {
  return (
    <div className={styles.package}>
      {packageData.sale && <div className={styles.sale}>{locale.sale}</div>}

      <div className={styles.package_img} style={{backgroundImage: `url(/img/packages/${packageData.img})`}} />

      <div className={styles.package_inner}>
        <PackagePlace title={packageData.title} location={packageData.location} />

        <div className={styles.typologies_price}>
          <Typologies typologies={packageData.typologies} />
          <Price wasPrice={packageData.wasPrice} price={packageData.price} />
        </div>

        <div className={styles.desc}>{packageData.desc}</div>
        <Link to={packageData.link + packageData.key} className={styles.details}>{locale.linkText}</Link>
      </div>
    </div>
  );
}

function PackagePlace({ title, location }) {
  return (
    <div className={styles.place}>
      <h3 className={styles.place_title}>{title}</h3>
      <div className={styles.place_location}>{location}</div>
    </div>
  );
}

function Typologies({ typologies }) {
  return (
    <ul className={styles.typologies}>
      {typologies.map((typology, index) => {
        return <li key={`typology-${index}`}>{typology}</li>
      })}
    </ul>
  );
}

function Price({ wasPrice, price }) {
  return (
    <div className={styles.price_wrapper}>
      {wasPrice && <div className={styles.was_price}>{wasPrice}</div>}
      <div className={styles.price}>{price} $</div>
    </div>
  );
}

export default PackageList;