import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

function Logo() {
  return <Link to='/'><div className="logo" style={{background: `url(${LogoImg}) center no-repeat`, backgroundSize: 'contain'}} /></Link>
}

export default Logo;