import React, { useState, useEffect } from 'react';
import './headline.css';

export default function Headline(props) {
  const [color, setColor] = useState('#555');

  useEffect(() => {
    if (props.light) {
      setColor('#fff')
    }
  }, [props.light]);

  return <h1 className="headline" style={{color: color}}><span>{props.title}</span></h1>
}