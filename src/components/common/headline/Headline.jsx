import React, { useState } from 'react';
import { useEffect } from 'react';
import './headline.css';

export default function Headline(props) {
  const [color, setColor] = useState('#555');

  return <h1 className="headline" style={{color: color}}><span>{props.title}</span></h1>
}