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
      if (packageItem.price) {
        smallDest[[Math.floor(index/3)]].push(packageItem);
        index++;
      }

      bigDest[packageItem.location].inner.list.push(packageItem);
    });

    setPackagesData(smallDest);
    setBigDestData(bigDest);
  }), [wrapper.lang, locales]);

  const destinationData = [
    {
      bigDest: {
        location: locales.inside,
        img: 'packages-0.jpg',
        inner: {
          title: locales.packages,
          list: [
            {
              title: locales.city_tour,
              href: '/packages/city_tour'
            },
            {
              title: locales.hissar,
              href: '/packages/hissar'
            },
            {
              title: locales.chil_duhtaron,
              href: '/packages/chil_duhtaron'
            },
            {
              title: locales.iskanderkul,
              href: '/packages/iskanderkul'
            },
            {
              title: locales.safed_dara,
              href: '/packages/safed_dara'
            }
          ],
          link: {
            title: locales.linkText,
            href: '/packages'
          }
        }
      },
      smallDest: [
        {
          img: 'hissar.jpg',
          title: locales.hissar,
          price: 8,
          link: '/packages/hissar'
        },
        {
          img: 'city_tour.jpg',
          title: locales.city_tour,
          price: 18,
          link: '/packages/city_tour'
        },
        {
          img: 'chil_duhtaron.jpg',
          title: locales.chil_duhtaron,
          price: 65,
          link: '/packages/chil_duhtaron'
        }
      ]
    },
    {
      bigDest: {
        location: locales.outside,
        img: 'packages-1.jpg',
        inner: {
          title: locales.packages,
          list: [
            {
              title: locales.turkey,
              href: '/packages/turkey'
            },
            {
              title: locales.emirates,
              href: '/packages/emirates'
            }
          ],
          link: {
            title: locales.linkText,
            href: '/packages'
          }
        }
      },
      smallDest: [
        {
          img: 'iskanderkul.jpg',
          title: locales.iskanderkul,
          price: 25,
          link: '/packages/iskanderkul'
        },
        {
          img: 'turkey.jpg',
          title: locales.turkey,
          price: 550,
          link: '/packages/turkey'
        },
        {
          img: 'emirates.jpg',
          title: locales.emirates,
          price: 500,
          link: '/packages/emirates'
        }
      ]
    }
  ];

  return (
    <DestinationContext.Provider value={locales}>
      <div className={`${styles.destination_block} block_item`}>
        <Headline title={locales.ourDestinations} />

        <div className={styles.destinations}>
          {/* {destinationData.map((dest, index) => {
            return <DestinationItem bigDest={dest.bigDest} smallDest={dest.smallDest} key={'destination-' + index} />
          })} */}

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
      <div className={styles.destination_img} style={{backgroundImage: `url(/img/packages/${img})`}} />
      <div className={styles.destination_desc}>
        <h3 className={styles.title}>{title}</h3>
        <Link to={`/packages/${key}`} className={styles.link}>{price} $</Link>
      </div>
    </div>
  );
}

export default Destination;