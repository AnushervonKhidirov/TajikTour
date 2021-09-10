import React from 'react';
import { useParams } from 'react-router';
import NewsList from '../components/newsComponents/newsList/NewsList';
import NewsItem from '../components/newsComponents/newsItem/NewsItem';

function News() {
  const { newsItem } = useParams()
  return newsItem ? <NewsItem newsItem={newsItem} /> : <NewsList />;
}

export default News;