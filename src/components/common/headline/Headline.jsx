import React, { useState, useEffect } from 'react';
import styles from './Headline.module.css';

export default function Headline({ title, light = false }) {
  const [color, setColor] = useState('#555');
  useEffect(() => {if (light) setColor('#fff')}, [light]);

  return <h1 className={styles.headline} style={{color: color}}>{title}</h1>
}