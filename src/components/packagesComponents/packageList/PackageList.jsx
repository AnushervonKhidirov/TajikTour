import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import { Link } from 'react-router-dom';
import './packagesList.css';

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
      typologies: [locales.typologies.cultural, locales.typologies.relax],
      price: 700,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'bora_bora',
      img: 'bora_bora.jpg',
      title: locales.boraBora,
      location: locales.asia,
      typologies: [locales.typologies.history, locales.typologies.cultural],
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
      typologies: [locales.typologies.sport, locales.typologies.relax],
      price: 400,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'phuket',
      img: 'phuket.jpg',
      title: locales.phuket,
      location: locales.thailandia,
      typologies: [locales.typologies.relax, locales.typologies.cultural],
      price: 1200,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'seychelles',
      img: 'seychelles.jpg',
      title: locales.seychelles,
      location: locales.netherlands,
      typologies: [locales.typologies.history, locales.typologies.sport],
      price: 1500,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    },
    {
      key: 'hawaii',
      img: 'hawaii.jpg',
      title: locales.hawaii,
      location: locales.italy,
      typologies: [locales.typologies.sport, locales.typologies.relax],
      sale: true,
      wasPrice: 950,
      price: 730,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut efficitur ante. Donec dapibus dictum scelerisque.',
      link: '/packages/'
    }
  ]

  return (
    <div className="packages_wrapper">
      {packagesData.map(packageItem => {
        return <Package packageData={packageItem} linkText={locales.linkText} key={packageItem.key} />
      })}
    </div>
  );
}

function Package({ packageData, linkText }) {
  return (
    <div className="package">
      {packageData.sale && <div className="sale">Sale</div>}

      <div className="package_img" style={{backgroundImage: `url(/img/packages/${packageData.img})`}} />

      <div className="package_inner">
        <PackagePlace title={packageData.title} location={packageData.location} />

        <div className="typologies-price">
          <Typologies typologies={packageData.typologies} />
          <Price wasPrice={packageData.wasPrise} price={packageData.price} />
        </div>

        <div className="desc">{packageData.desc}</div>
        <Link to={packageData.link + packageData.key} className="details">{linkText}</Link>
      </div>
    </div>
  );
}

function PackagePlace({ title, location }) {
  return (
    <div className="place">
      <h3 className="place_title">{title}</h3>
      <div className="place_location">{location}</div>
    </div>
  );
}

function Typologies({ typologies }) {
  return (
    <ul className="typologies">
      {typologies.map((typology, index) => {
        return <li key={`typology-${index}`}>{typology}</li>
      })}
    </ul>
  );
}

function Price({ wasPrice, price }) {
  return (
    <div className="price_wrapper">
      {wasPrice && <div className="was_price">{wasPrice}</div>}
      <div className="price">{price} $</div>
    </div>
  );
}


export default PackageList;