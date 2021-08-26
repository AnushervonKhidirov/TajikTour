import React, { useEffect, useState, useContext } from 'react';
import { WrapperContext, HeaderContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import { LogoIcon, LangIcon, FacebookIcon, Twitter, LinkedIn, Pinterest } from '../../components/common/Icons';
import './header.css';

function Header() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./${wrapper.lang}Locale`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  return (
    <HeaderContext.Provider value={locales}>
      <header className="header">
        <TopHeader />
        <MainHeader />
      </header>
    </HeaderContext.Provider>
  );
}

// top
function TopHeader() {
  return (
    <div className="top__header">
      <div className="left_header">
        <Languages />
        <Social />
      </div>

      <div className="right_header">
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
    <div className="languages">
      <div className="lang_icon">
        <LangIcon />
      </div>
      <span>{header.langText}</span>

      <ul className="lang_list">
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
    <ul className="social_list">
      {socials.map((social, index) => {
        return <li key={social.title + index}><a href={social.link} title={social.title} rel="noreferrer" target="_blank">{social.component}</a></li>
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
  return <div className="main_header">
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
        link: '/'
      },
      {
        title: header.menu && header.menu.packages,
        link: '/packages'
      },
      {
        title: header.menu && header.menu.news,
        link: '/news'
      },
      {
        title: header.menu && header.menu.contacts,
        link: '/contacts'
      }
    ])
  }, [header.menu])

  return (
    <div className="header_menu">
      {menuBtn.map((navLink, index) => {
        return <NavLink to={navLink.link} exact={true} activeClassName="active" className="menu_link" key={index}>{navLink.title}</NavLink>
      })}
    </div>
  );
}


function Logo() {
  return (
    <NavLink to='/'>
      <div className="logo">
        <LogoIcon />
      </div>
    </NavLink>
  );
}

export default Header;