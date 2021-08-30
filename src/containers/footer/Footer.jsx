import React, { useEffect, useState, useContext } from 'react';
import { WrapperContext, FooterContext } from '../../Context';
import { LogoIcon } from '../../components/common/Icons';
import './footer.css';

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
      rightText: '© Tajic Tour 2021'
    }
  }

  return (
    <FooterContext.Provider value={footerData}>
      <footer className="footer" style={{backgroundImage: `url(./img/footer.jpg)`}}>
        <FooterInner />
      </footer>
    </FooterContext.Provider>
  );
}

function FooterInner() {
  return (
    <div className="footer_block">
      <FooterLeft />
      <FooterRight />
      <BottomFooter />
    </div>
  );
}

function FooterLeft() {
  const { footerDesc } = useContext(FooterContext);

  return (
    <div className="footer_left">
      <div className="footer_logo"><LogoIcon /></div>
      <div className="footer_desc">{footerDesc}</div>
    </div>
  );
}

function FooterRight() {
  const { footerLists } = useContext(FooterContext);

  return (
    <div className="footer_right">
      {footerLists.map((lists, index) => {
        return <List title={lists.title} list={lists.list} key={lists.title + index.toString()} />
      })}
    </div>
  );
}


function List( {title, list} ) {
  return (
    <div className="footer_list">
      <h5 className="list_title">{title}</h5>

      <ul>
        {list.map((listItem, index) => <ListItem listText={listItem} key={listItem + index.toString()} />)}
      </ul>
    </div>
  );
}

function ListItem( {listText} ) {
  return (
    <li>
      <div className="list_arrow"></div>
      <div className="list_text">{listText}</div>
    </li>
  );
}

function BottomFooter() {
  const { leftText, rightText } = useContext(FooterContext).footerBottom;

  return (
    <div className="footer_bottom">
      <div className="left_text">{leftText}</div>
      <div className="right_text">{rightText}</div>
    </div>
  );
}

export default Footer;