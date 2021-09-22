import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { WrapperContext } from '../../../Context';
import { Link } from 'react-router-dom';
import Headline from '../../common/headline/Headline';
import styles from './NewsList.module.css'

function NewsList() {
  const wrapper = useContext(WrapperContext);
  const path = useLocation().pathname;
  const [newsList, setNewsList] = useState([]);
  const [locales, setLocales] = useState({});

  useEffect(() => {
    import(`./locales/${wrapper.lang}`).then(newsList => setLocales(newsList.locales));
    import(`../../common/data/newsListData/${wrapper.lang}`).then(newsList => setNewsList(newsList.newsListData));
  }, [wrapper.lang]);

  return (
    <div className={styles.news_list_wrapper}>
      <Headline title={locales.title} />
      <div className={styles.news_list}>
        {newsList.map(news => {
          return <NewsItem news={news} path={path} linkText={locales.linkText} key={news.newsKey} />
        })}
      </div>
    </div>
  );
}

function NewsItem({ news, path, linkText }) {
  return (
    <div className={styles.news}>
      <div className={styles.news_img} style={{ backgroundImage: `url(/img/news/${news.newsImg})` }} ></div>
      <div className={styles.text}>
        <h3 className={styles.title}>{news.newsTitle}</h3>
        <div className={styles.desc}>{news.newsDesc}</div>
        <Link to={`${path}/${news.newsKey}`}>{linkText}</Link>
      </div>
    </div>
  );
}

export default NewsList;