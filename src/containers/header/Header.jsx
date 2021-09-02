import React, { useEffect, useState, useContext } from 'react';
import { WrapperContext, HeaderContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/common/logo/Logo';
import { LangIcon, FacebookIcon, Twitter, LinkedIn, Pinterest } from '../../components/common/Icons';
import styles from './Header.module.css';

function Header() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  return (
    <HeaderContext.Provider value={locales}>
      <header>
        <TopHeader />
        <MainHeader />
      </header>
    </HeaderContext.Provider>
  );
}

// top
function TopHeader() {
  return (
    <div className={styles.top__header}>
      <div className={styles.left_header}>
        <Languages />
        <Social />
      </div>

      <div className={styles.right_header}>
        <ContactUs />
      </div>
    </div>
  );
}

function Languages() {
  const wrapper = useContext(WrapperContext);
  const header = useContext(HeaderContext);
  const langs = ['ru', 'en'];

  return (
    <div className={styles.languages}>
      <div className={styles.lang_icon}>
        <LangIcon />
      </div>
      <span>{header.langText}</span>

      <ul className={styles.lang_list}>
        {langs.map(lang => {
          return <li onClick={() => wrapper.switchLang(lang)} key={lang}>{lang}</li>;
        })}
      </ul>
    </div>
  );
}

function Social() {
  const socials = [
    {
      title: 'Facebook',
      link: 'https://www.facebook.com/',
      component: <FacebookIcon />
    },
    {
      title: 'Twitter',
      link: 'https://twitter.com/',
      component: <Twitter />
    },
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/',
      component: <LinkedIn />
    },
    {
      title: 'Pinterest',
      link: 'https://www.pinterest.com/',
      component: <Pinterest />
    }
  ];

  return (
    <ul className={styles.social_list}>
      {socials.map((social, index) => {
        return (
          <li key={social.title + index}>
            <a href={social.link} title={social.title} rel="noreferrer" target="_blank">{social.component}</a>
          </li>
        );
      })}
    </ul>
  );
}

function ContactUs() {
  const header = useContext(HeaderContext);

  return (
    <div>
      <NavLink to="contacts">{header.contactUs}</NavLink>
    </div>
  );
}

// bottom
function MainHeader() {
  return <div className={styles.main_header}>
    <Logo />
    <Menu />
  </div>;
}

function Menu() {
  const header = useContext(HeaderContext);
  const [menuBtn, setMenuBtn] = useState([]);
  
  useEffect(() => {
    setMenuBtn([
      {
        title: header.menu && header.menu.home,
        link: '/',
        exact: true
      },
      {
        title: header.menu && header.menu.packages,
        link: '/packages',
        exact: false
      },
      {
        title: header.menu && header.menu.news,
        link: '/news',
        exact: false
      },
      {
        title: header.menu && header.menu.contacts,
        link: '/contacts',
        exact: true
      }
    ])
  }, [header.menu])

  return (
    <div className={styles.header_menu}>
      {menuBtn.map((navLink, index) => {
        return <NavLink
          to={navLink.link}
          exact={navLink.exact}
          activeClassName={styles.active}
          className={styles.menu_link}
          key={index}>{navLink.title}
        </NavLink>
      })}
    </div>
  );
}

export default Header;