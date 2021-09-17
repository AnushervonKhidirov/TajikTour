import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import styles from './NewsItem.module.css';

function News({ newsItem }) {
  const wrapper = useContext(WrapperContext);
  const [news, setNews] = useState({});

  // add error page !!!
  useEffect(() => import(`./newsData/${wrapper.lang}`).then(news => setNews(news.newsData[newsItem] || {})), [wrapper.lang, newsItem]);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className={`${styles.news_item_wrapper} block_item`}>
      <h2 className={styles.headline}>{news.title}</h2>
      <div className={styles.image} style={{ backgroundImage: `url(/img/news/${news.image})` }}></div>

      <div className={styles.desc}>
        {news.desc && news.desc.map((desc, index) => {
          return <NewsParagraph text={desc} key={`news_paragraph-${index}`} />
        })}
      </div>
    </div>
  );
}

function NewsParagraph({ text }) {
  return (
    <p className={styles.paragraph}>{text}</p>
  );
}

export default News;