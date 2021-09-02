import React from 'react';
import styles from './Loader.module.css';

export default function Loader({ customStyles }) {
  return (
    <div className={styles.loader} style={customStyles}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
