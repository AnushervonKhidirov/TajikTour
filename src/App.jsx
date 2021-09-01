import React, { useState } from 'react';
import { WrapperContext } from './Context';
import Header from './containers/header/Header';
import Content from './containers/content/Content';
import Footer from './containers/footer/Footer';
import './App.css';

function App() {
  let defaultLang = localStorage.getItem('tajik_tour_lang') || navigator.language;

  if (defaultLang !== 'en' && 'ru') defaultLang = 'ru';

  const [lang, setLang] = useState(defaultLang);

  function switchLang(lang) {
    setLang(lang);
    localStorage.setItem('tajik_tour_lang', lang);
  }

  return (
    <WrapperContext.Provider value={{ lang, switchLang: switchLang }}>
      <div className="wrapper">
        <Header />
        <Content />
        <Footer />
      </div>
    </WrapperContext.Provider>
  );
}

export default App;
