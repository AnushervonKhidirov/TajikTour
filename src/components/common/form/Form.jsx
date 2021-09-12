import React, { useState, useEffect, useContext } from 'react';
import emailjs from 'emailjs-com';
import { WrapperContext } from '../../../Context';
import { accessData } from './accessData';
import styles from './Form.module.css';

function Form({ tourPackage }) {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [sendData, setSendData] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);
  useEffect(() => tourPackage && setSendData({package: tourPackage}), [tourPackage]);

  function sendEmail(e) {
    e.preventDefault();
    if(sendData.package) e.target.package.value = sendData.package;

    emailjs.sendForm(accessData.serviceId, accessData.templateId, e.target, accessData.userId)
      .then((result) => {
          alert(locales.sendMessage);
      }, (error) => {
          alert(locales.errorMessage)
      });
  }

  function recordValues(e) {
    let selectsValue = sendData;
    selectsValue[e.target.name] = e.target.value;
    selectsValue[e.target.name] === '' && delete selectsValue[e.target.name];
    setSendData(selectsValue);
  }

  return (
    <form className={styles.form} onSubmit={e => sendEmail(e)}>
      <input className={`${styles.form_input} ${styles.name}`} type="text" name="name" required placeholder={locales.name} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.surname}`} type="text" name="surname" required placeholder={locales.surname} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.email}`} type="email" name="email" placeholder={locales.email} onChange={e => recordValues(e)} />
      <input className={`${styles.form_input} ${styles.phone}`} type="tel" name="phone" required placeholder={locales.phone} onChange={e => recordValues(e)} />
      <input style={{display: 'none'}} type="text" name="package" />
      <textarea className={styles.form_message} name="message" resize="false" placeholder={locales.message} onChange={e => recordValues(e)} />
      <button className={styles.submit_btn} type="submit">{locales.send}</button>
    </form>
  );
}

export default Form;