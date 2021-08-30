import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import { CheckMarkIcon } from '../../common/Icons';
import './tourClasses.css';

function TourClasses() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const classesData = [
    {
      price: 20,
      classType: locales.basic,
      list: [
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet'
      ],
      link: {
        title: locales.link,
        href: '/'
      }
    },
    {
      price: 40,
      classType: locales.premium,
      list: [
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet'
      ],
      link: {
        title: locales.link,
        href: '/'
      }
    },
    {
      price: 60,
      classType: locales.business,
      list: [
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet',
        'Lorem ipsum dolor sit amet'
      ],
      link: {
        title: locales.link,
        href: '/'
      }
    }
  ]

  return (
    <div className="classes_block block_item">
      <Headline title="Classes" />

      <div className="classes">
        {classesData.map((classes, index) => {
          return (
            <ClassesItom 
            price={classes.price}
            type={classes.classType}
            list={classes.list}
            link={classes.link}
            monthly={locales.monthly}
            key={classes.type + index.toString()} />
          );
        })}
      </div>
    </div>
  );
}


function ClassesItom({ price, type, list, link, monthly }) {
  return (
    <div className="classes_wrapper">
      <div className="price_block">
        <div className="price">{price}<sup>$</sup></div>
        <div className="month">{monthly}</div>
      </div>

      <h2 className="classes_type">{type}</h2>

      <ul className="classes_list">
        {list.map((list, index) => {
          return <li className="list_item" key={`${type}_class_list-${index.toString()}`}><CheckMarkIcon /> {list}</li>
        })}
      </ul>

      <Link to={link.href} className="classes_link">{link.title}</Link>
    </div>
  );
}

export default TourClasses;