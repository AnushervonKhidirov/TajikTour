import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './Events.module.css';

function Events() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const eventsData = {
    porposals: {
      supTitle: locales.ourPorposals,
      title: locales.porposalsTitle,
      desc: locales.porposalsDesc,
      link: {
        title: locales.porposalsLink,
        href: '/'
      }
    },
    events: [
      {
        date: '04.11.2018',
        title: locales.travelEvents,
        desc: locales.travelEventsDesc,
        link: {
          title: locales.link,
          href: '/news'
        }
      },
      {
        date: '04.11.2018',
        title: locales.bestBeaches,
        desc: locales.bestBeachesDesc,
        link: {
          title: locales.link,
          href: '/news'
        }
      },
      {
        date: '04.11.2018',
        title: locales.magicBlooms,
        desc: locales.magicBloomsDesc,
        link: {
          title: locales.link,
          href: '/news'
        }
      },
      {
        date: '04.11.2018',
        title: locales.alternativeTrips,
        desc: locales.alternativeTripsDesc,
        link: {
          title: locales.link,
          href: '/news'
        }
      }
    ]
  }

  return (
    <div className={`${styles.events_block} block_item`}>
      <Headline title="Events" />
      <div className={styles.events}>
        <Proposals supTitle={eventsData.porposals.supTitle} title={eventsData.porposals.title} desc={eventsData.porposals.desc} link={eventsData.porposals.link} />
        {eventsData.events.map((event, index) => {
          return <EventItems date={event.date} title={event.title} desc={event.desc} link={event.link} key={event.title + index.toString()} />
        })}
      </div>
    </div>
  );
}


function Proposals({ supTitle, title, desc, link }) {
  return (
    <div className={styles.proposals}>
      <div className={styles.sup_title}>{supTitle}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.desc}>{desc}</div>
      <Link to={link.href} className={styles.link}>{link.title}</Link>
    </div>
  )
}

function EventItems({ date, title, desc, link }) {
  return (
    <div className={styles.event}>
      <div className={styles.event_date}>{date}</div>
      <h2 className={styles.event_title}>{title}</h2>
      <div className={styles.event_desc}>{desc}</div>
      <Link to={link.href} className={styles.event_link}>{link.title}</Link>
    </div>
  );
}

export default Events;