import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import { Link } from 'react-router-dom';
import styles from './PackageList.module.css'

function PackageList() {
  const wrapper = useContext(WrapperContext);
  const path = useLocation().pathname;
  const [locales, setLocales] = useState({});
  const [packagesData, setPackagesData] = useState([]);

  useEffect(() => import(`./packageListData/${wrapper.lang}`).then(packages => {
    setPackagesData(packages.packageListData);
    setLocales(packages.locale);
  }), [wrapper.lang]);


  return (
    <div className={styles.packages_wrapper}>
      {packagesData.map(packageItem => {
        return <Package packageData={packageItem} locale={locales} path={path} key={packageItem.key} />
      })}
    </div>
  );
}

function Package({ packageData, locale, path }) {
  return (
    <div className={styles.package}>
      {packageData.sale && <div className={styles.sale}>{locale.sale}</div>}

      <div className={styles.package_img} style={{backgroundImage: `url(/img/packages/${packageData.img})`}} />

      <div className={styles.package_inner}>
        <PackagePlace title={packageData.title} />

        <div className={styles.typologies_price}>
          <Typologies typologies={packageData.typologies} />
          {packageData.price && <Price wasPrice={packageData.wasPrice} price={packageData.price} />}
        </div>

        <div className={styles.desc}>{packageData.desc}</div>
        <Link to={`${path}/${packageData.key}`} className={styles.details}>{locale.linkText}</Link>
      </div>
    </div>
  );
}

function PackagePlace({ title }) {
  return (
    <div className={styles.place}>
      <h3 className={styles.place_title}>{title}</h3>
      {/* <div className={styles.place_location}>{location}</div> */}
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