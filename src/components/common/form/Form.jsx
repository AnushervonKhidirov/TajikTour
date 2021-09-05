import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext } from '../../../Context';
import styles from './Form.module.css';

function Form({ tourPackage }) {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  const [formData, setFormData] = useState({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  useEffect(() => {
    setFormData({
      tourPackage: tourPackage,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      message: message
    });
  }, [name, surname, email, phone, message, tourPackage]);

  function sendForm(e) {
    e.preventDefault();

    console.log(JSON.stringify(formData));
  }

  return (
    <form className={styles.form} onSubmit={(e) => sendForm(e)}>
      <input className={`${styles.form_input} ${styles.name}`} type="text" name="name" required placeholder={locales.name} onChange={(e) => setName(e.target.value)} />
      <input className={`${styles.form_input} ${styles.surname}`} type="text" name="surname" required placeholder={locales.surname} onChange={(e) => setSurname(e.target.value)} />
      <input className={`${styles.form_input} ${styles.email}`} type="email" name="email" placeholder={locales.email} onChange={(e) => setEmail(e.target.value)} />
      <input className={`${styles.form_input} ${styles.phone}`} type="tel" name="phone" required placeholder={locales.phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea className={styles.form_message} name="message" resize="false" placeholder={locales.message} onChange={(e) => setMessage(e.target.value)} />
      <button className={styles.submit_btn} type="submit">{locales.send}</button>
    </form>
  );
}

export default Form;