import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext } from '../../../Context';
import styles from './Form.module.css';

function Form({ tourPackage }) {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  function sendForm(e) {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  }

  function recordValues(e) {
    let selectsValue = {};
    selectsValue[e.target.name] = e.target.value;
    setFormData(Object.assign(formData, selectsValue));
  }

  return (
    <form className={styles.form} onSubmit={e => sendForm(e)}>
      <input className={`${styles.form_input} ${styles.name}`} type="text" name="name" required placeholder={locales.name} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.surname}`} type="text" name="surname" required placeholder={locales.surname} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.email}`} type="email" name="email" placeholder={locales.email} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.phone}`} type="tel" name="phone" required placeholder={locales.phone} onChange={e => recordValues(e)} />
      <textarea className={styles.form_message} name="message" resize="false" placeholder={locales.message} onChange={e => recordValues(e)} />
      <button className={styles.submit_btn} type="submit">{locales.send}</button>
    </form>
  );
}

export default Form;