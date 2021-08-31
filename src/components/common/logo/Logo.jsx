import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import { Link } from "react-router-dom";
import { LogoIcon } from "../Icons";
import './logo.css'


function Logo() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  return (
    <Link to='/'>
      <div className="logo">
        <LogoIcon />
        <div className="logo_text">
          <div className="logo_title">{locales.title}</div>
          <div className="logo_slogan">{locales.slogan}</div>
        </div>
      </div>
    </Link>
  );
}

export default Logo;