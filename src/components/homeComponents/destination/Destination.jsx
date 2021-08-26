import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext, DestinationContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import './destination.css';

function Destination() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./${wrapper.lang}Locale`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const destinationData = [
    {
      bigDest: {
        location: locales.asia,
        packagesLingth: 2
      },
      smallDest: [
        {
          title: locales.kohSamui,
          location: locales.europe,
          price: 700
        },
        {
          title: locales.boraBora,
          location: locales.asia,
          price: 500
        },
        {
          title: locales.maldives,
          location: locales.oceania,
          price: 400
        }
      ]
    },
    {
      bigDest: {
        location: locales.europe,
        packagesLingth: 3
      },
      smallDest: [
        {
          title: locales.hawaii,
          location: locales.italy,
          price: 730
        },
        {
          title: locales.seychelles,
          location: locales.netherlands,
          price: 1500
        },
        {
          title: locales.phuket,
          location: locales.thailandia,
          price: 1200
        }
      ]
    }
  ];

  return (
    <DestinationContext.Provider value={locales}>
      <div className="destination_block">
      <Headline title={locales.ourDestinations} />

        <div className="destinations">
          {destinationData.map((dest, index) => {
            return <DestinationItem dests={dest} key={'destination-' + index} />
          })}
        </div>
      </div>
    </DestinationContext.Provider>
  );
}

function DestinationItem(props) {
  const dest = props.dests;

  return (
    <div className="destination_item">
      <DestinationBigPackage dest={dest.bigDest} />
      <DestinationSmallPackage dest={dest.smallDest} />
    </div>
  );
}

function DestinationBigPackage(props) {
  const locale = useContext(DestinationContext);

  return (
    <div className="destination_package">
      <div className="text">
        <div className="location">{props.dest.location}</div>
        <div className="packages">{props.dest.packagesLingth} {props.dest.packagesLingth > 4 ? locale.packagesMoreFour : locale.packages}</div>
      </div>
    </div>
  );
}

function DestinationSmallPackage(props) {
  const locale = useContext(DestinationContext);
  const dest = props.dest;

  return (
    <>
      {dest.map((dest, index) => {
        return (
          <div className={`destination_list_item destination_list_item-${index}`} key={dest.title + index.toString()}>
            <div className="destination_img"></div>
            <div className="destination_desc">
              <h3 className="title">{dest.title}</h3>
              <div className="location">{dest.location}</div>
              <div className="link">{locale.from} {dest.price} $</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Destination;