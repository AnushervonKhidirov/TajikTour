import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext, DestinationContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import './destination.css';

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
      <div className="destination_block block_item">
        <Headline title={locales.ourDestinations} />

        <div className="destinations">
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
    <div className="destination_item">
      <DestinationBigPackage dest={bigDest} />
      {smallDest.map((smallDest, index) => {
        return <DestinationSmallPackage dest={smallDest} index={index} key={smallDest.title + index.toString()} />
      })}
    </div>
  );
}

function DestinationBigPackage({ dest }) {
  const locale = useContext(DestinationContext);
  const {location, packagesLength, img, inner} = dest;

  return (
    <div className="destination_package" style={{backgroundImage: `url(./img/${img})`}}>
      <div className="text">
        <div className="location">{location}</div>
        <div className="packages">{locale.packages}: {packagesLength}</div>
      </div>

      <div className="destination_inner">
        <h3 className="title">{inner.title}</h3>
        <ul>
          {inner.list.map((list, index) => {
            return <Link to={list.href} key={list.title + index.toString()}><li>{list.title}</li></Link>
          })}
        </ul>

        <Link to={inner.link.href} className="link">{inner.link.title}</Link>
      </div>
    </div>
  );
}

function DestinationSmallPackage({ dest, index }) {
  const locale = useContext(DestinationContext);
  const { img, title, location, price } = dest;

  return (
    <div className={`destination_list_item destination_list_item-${index}`}>
      <div className="destination_img" style={{backgroundImage: `url(./img/${img})`}}></div>
      <div className="destination_desc">
        <h3 className="title">{title}</h3>
        <div className="location">{location}</div>
        <div className="link">{locale.from} {price} $</div>
      </div>
    </div>
  );
}

export default Destination;