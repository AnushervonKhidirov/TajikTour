import React, { useEffect, useState, useContext } from 'react';
import { WrapperContext, FooterContext } from '../../Context';
import Logo from '../../components/common/logo/Logo';
import styles from './Footer.module.css';

function Footer() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const footerData = {
    footerDesc: locales.footerDesc,
    footerLists: [
      {
        title: locales.ourAgency,
        list: [
          locales.services,
          locales.insurancee,
          locales.agency,
          locales.tourism,
          locales.payment,
        ]
      },
      {
        title: locales.partners,
        list: [
          locales.booking,
          locales.rentalCar,
          locales.hostelWorld,
          locales.trivago,
          locales.tripAdvisor,
        ]
      },
      {
        title: locales.lastMinute,
        list: [
          locales.london,
          locales.california,
          locales.indonesia,
          locales.europe,
          locales.oceania,
        ]
      }
    ],
    footerBottom: {
      leftText: locales.bottomFooterText,
      rightText: '© Tajik Tour 2021'
    }
  }

  return (
    <FooterContext.Provider value={footerData}>
      <footer style={{backgroundImage: `url(/img/others/footer.jpg)`}}>
        <FooterInner />
      </footer>
    </FooterContext.Provider>
  );
}

function FooterInner() {
  return (
    <div className={styles.footer_block}>
      <FooterLeft />
      <FooterRight />
      <BottomFooter />
    </div>
  );
}

function FooterLeft() {
  const { footerDesc } = useContext(FooterContext);

  return (
    <div className={styles.footer_left}>
      <div className={styles.footer_logo}><Logo /></div>
      <div className={styles.footer_desc}>{footerDesc}</div>
    </div>
  );
}

function FooterRight() {
  const { footerLists } = useContext(FooterContext);

  return (
    <div className={styles.footer_right}>
      {footerLists.map((lists, index) => {
        return <List title={lists.title} list={lists.list} key={lists.title + index.toString()} />
      })}
    </div>
  );
}


function List({ title, list }) {
  return (
    <div className={styles.footer_list}>
      <h5 className={styles.list_title}>{title}</h5>

      <ul>
        {list.map((listItem, index) => <ListItem listText={listItem} key={listItem + index.toString()} />)}
      </ul>
    </div>
  );
}

function ListItem({ listText }) {
  return (
    <li>
      <div className={styles.list_arrow} />
      <div className={styles.list_text}>{listText}</div>
    </li>
  );
}

function BottomFooter() {
  const { leftText, rightText } = useContext(FooterContext).footerBottom;

  return (
    <div className={styles.footer_bottom}>
      <div className={styles.left_text}>{leftText}</div>
      <div className={styles.right_text}>{rightText}</div>
    </div>
  );
}

export default Footer;