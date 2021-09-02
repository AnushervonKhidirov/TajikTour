import React from 'react';
import styles from './SubHeadline.module.css';

export default function SubHeadline({ title }) {
  return <h2 className={styles.sub_headline}>{title}</h2>
}