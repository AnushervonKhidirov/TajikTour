import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import './achievements.css';

function Achievements() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./${wrapper.lang}Locale`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const achievementsData = [
    {
      name: locales.yearOfExperience,
      number: 30
    },
    {
      name: locales.satisfiedCustomers,
      number: 78
    },
    {
      name: locales.typesOfInsurance,
      number: 45
    },
    {
      name: locales.travelDestinations,
      number: 56
    }
  ]

  return (
    <div className="achievements_block block_item">
      {achievementsData.map((achievement, index) => {
        return <AchievementsItem name={achievement.name} number={achievement.number} key={achievement.name + index.toString()} />
      })}
    </div>
  );
}

function AchievementsItem(props) {
  return (
    <div className="achievements_item">
      <div className="achievements_number">{props.number}</div>
      <div className="achievements_name">{props.name}</div>
    </div>
  );
}

export default Achievements;