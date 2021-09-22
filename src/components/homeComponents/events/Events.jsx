import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './Events.module.css';

function Events() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale));
    import(`../../common/data/newsListData/${wrapper.lang}`).then(newsList => {
      let newsArray = [];

      for (let i = 0; i < newsList.newsListData.length; i++) {
        if (i >= 4) break;
        newsArray.push(newsList.newsListData[i]);
      }

      setNewsList(newsArray);
    });
  }, [wrapper.lang]);

  const porposals = {
    supTitle: locales.ourPorposals,
    title: locales.porposalsTitle,
    desc: locales.porposalsDesc,
    link: {
      title: locales.porposalsLink,
      href: '/news'
    }
  }

  return (
    <div className={`${styles.events_block} block_item`}>
      <Headline title={locales.events} />
      <div className={styles.events}>
        <Proposals supTitle={porposals.supTitle} title={porposals.title} desc={porposals.desc} link={porposals.link} />
        {newsList.map(event => <EventItems data={event} linkText={locales.link} key={event.newsKey} />)}
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

function EventItems({ data, linkText }) {
  let { date, newsTitle, newsDesc, newsKey } = data;

  return (
    <div className={styles.event}>
      <div className={styles.event_date}>{date}</div>
      <h2 className={styles.event_title}>{newsTitle}</h2>
      <div className={styles.event_desc}>{newsDesc}</div>
      <Link to={`/news/${newsKey}`} className={styles.event_link}>{linkText}</Link>
    </div>
  );
}

export default Events;