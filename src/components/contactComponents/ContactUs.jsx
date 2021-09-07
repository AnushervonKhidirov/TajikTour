import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext } from '../../Context';
import SubHeadline from '../common/subHeadline/SubHeadline';
import Form from '../common/form/Form';
import styles from './Contact.module.css';

function ContactUs() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const contactData = {
    descTitle: locales.descTitle,
    descText: locales.descText,
    mapUrl: `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1881.533868234483!2d68.79432304084928!3d38.58022210922806!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b5d158a31b3d89%3A0x33d21fc3f03cc97a!2z0J_QvtC50YLQsNGF0YI!5e0!3m2!1s${wrapper.lang}!2s!4v1630903133777!5m2!1s${wrapper.lang}!2s`,
    addressData: [
      {
        title: locales.city,
        value: locales.cityData
      },
      {
        title: locales.address,
        value: locales.addressData
      },
      {
        title: locales.phone,
        value: '837920234'
      },
      {
        title: locales.email,
        value: 'info@travel.com'
      },
      {
        title: locales.availableAt,
        value: locales.availableAtData
      }
    ]
  }

  return (
    <div className={styles.contact_us}>
      <Desc title={contactData.descTitle} text={contactData.descText} />
      <Form />
      <Map url={contactData.mapUrl} />
      <AddressData address={contactData.addressData} />
    </div>
  );
}

function Desc({ title, text }) {
  return (
    <div className={styles.description}>
      <SubHeadline title={title} />
      <div className={styles.text}>{text}</div>
    </div>
  );
}

function Map({ url }) {
  return (
    <div className={styles.map}>
      <iframe title='TajikTour' src={url} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen loading="lazy" />
    </div>
  );
}

function AddressData({ address }) {
  return (
    <div className={styles.address_data}>
      {address.map((data, index) => <AddressItem title={data.title} value={data.value} key={data.title + index.toString()} />)}
    </div>
  );
}

function AddressItem({ title, value }) {
  return (
    <div className={styles.address}>
      <div className={styles.title}>{title} :</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

export default ContactUs;