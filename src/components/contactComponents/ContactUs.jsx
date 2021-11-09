import React, { useState, useEffect, useContext, useCallback } from 'react';
import { WrapperContext } from '../../Context';
import SubHeadline from '../common/subHeadline/SubHeadline';
import Form from '../common/form/Form';
import styles from './Contact.module.css';

function ContactUs() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const isOpen = useCallback(() => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let weekDay = date.getDay();
  
    if (day < 10) day = '0' + day.toString();
    if (month < 10) month = '0' + month.toString();
    if (hour < 10) hour = '0' + hour.toString();
    if (minute < 10) minute = '0' + minute.toString();
  
    let openFrom = Date.parse(`${year}-${month}-${day}T07:30:00.000Z`);
    let currentHour = Date.parse(`${year}-${month}-${day}T${hour}:${minute}:00.000Z`);
    let openTo = Date.parse(`${year}-${month}-${day}T23:00:00.000Z`);

    if (currentHour >= openFrom && currentHour <= openTo && weekDay !== 0) {
      setStatus({
        text: locales.opened,
        value: 'opened'
      });
    } else {
      setStatus({
        text: locales.closed,
        value: 'closed'
      });
    }
  }, [locales.opened, locales.closed])

  useEffect(() => isOpen(), [locales, isOpen]);

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
        value: '+992 111 222 422'
      },
      {
        title: locales.email,
        value: 'tojiktour@mail.ru'
      },
      {
        title: locales.availableAt,
        status: status,
        value: locales.availableAtData
      }
    ],
    desc: locales.desc
  }


  return (
    <div className={styles.contact_us}>
      <Map url={contactData.mapUrl} />
      <AddressData address={contactData.addressData} />
      <Description paragraph={contactData.desc} />
      <Form />
    </div>
  );
}

function Description({ paragraph }) {
  return (
    <div className={styles.description}>
      {paragraph && paragraph.map((paragraph, index) => {
        return (
          <div className={styles.paragraph} key={`paragraph-${index}`}>
            <SubHeadline title={paragraph.headline} key={`headline-${index}`} />
            {paragraph.text.map((text, index) => {
              return <div key={`text-${index}`}>{text}</div>;
            })}
          </div>
        )
      })}
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
      {address.map((data, index) => <AddressItem title={data.title} status={data.status} value={data.value} key={data.title + index.toString()} />)}
    </div>
  );
}

function AddressItem({ title, status, value }) {
  return (
    <div className={styles.address}>
      <div className={styles.title}>{title} :</div>
      <div className={styles.value}>
        {status && <span data-status={status.value}>({status.text}) </span>}
        {value}
      </div>
    </div>
  );
}

export default ContactUs;