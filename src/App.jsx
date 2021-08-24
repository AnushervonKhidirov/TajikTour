import React, { useState, useEffect, useRef } from 'react';
import { WrapperContext } from './Context';
import Header from './containers/header/Header';
import Content from './containers/content/Content';
import Sidebar from './containers/sidebar/Sidebar';
import Footer from './containers/footer/Footer';
import './App.css';

function App() {
  let defaultLang = localStorage.getItem('tajik_tour_lang') || navigator.language;
  if (defaultLang !== 'en' || 'ru') defaultLang = 'ru';

  const wrapper = useRef();
  const [device, setDevice] = useState('');
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    let wrapperWidth = wrapper.current.offsetWidth;

    if (wrapperWidth < 850 && wrapperWidth > 568) {
      setDevice('tablet');
    } else if (wrapperWidth <= 568) {
      setDevice('mobile');
    } else {
      setDevice('desktop');
    };
  }, [device]);

  function switchLang(lang) {
    setLang(lang);
    localStorage.setItem('tajik_tour_lang', lang);
  }

  return (
    <WrapperContext.Provider value={{wrapper, lang, switchLang: switchLang}}>
      <div className="wrapper" ref={wrapper} data-device={device} lang={lang}>
        <Header device={device} />
        <div className="layout">
          <Content />
          <Sidebar />
        </div>
        <Footer device={device} />
      </div>
    </WrapperContext.Provider>
  );
}

export default App;
