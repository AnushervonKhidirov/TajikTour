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
    footerPartners: {
      headline: locales.partners,
      list: [
        {
          title: 'Аэрофлот',
          image: 'aeroflot.png'
        },
        {
          title: 'Fly Dubai',
          image: 'flydubai.png'
        },
        {
          title: 'S7 Airlines',
          image: 's7_airlines.png'
        },
        {
          title: 'Somon Air',
          image: 'somon_air.png'
        },
        {
          title: 'Tajik Air',
          image: 'tajikair.png'
        },
        {
          title: 'Turkish Airlines',
          image: 'turkish_airlines.png'
        },
        {
          title: 'Ural Airlines',
          image: 'ural_airlines.png'
        },
        {
          title: 'Uzbekistan Airways',
          image: 'uzbekistan_airways.png'
        }
      ]
    },
    footerBottom: {
      leftText: locales.bottomFooterText,
      rightText: '© Tojik Tour 2021'
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
  const { footerPartners } = useContext(FooterContext);

  return (
    <div className={styles.footer_right}>
      <h3 className={styles.headline}>{footerPartners.headline}</h3>

      <div className={styles.partner_list}>
        {footerPartners.list.map((partner, index) => {
          return <Partners title={partner.title} image={partner.image} key={partner.title} />
        })}
      </div>
    </div>
  );
}


function Partners({ title, image }) {
  return (
    <div className={styles.partner} data-title={title} style={{backgroundImage: `url(/img/partners/${image})`}}></div>
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