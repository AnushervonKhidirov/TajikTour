import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import styles from './Achievements.module.css';

function Achievements() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

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
    <div className={`${styles.achievements_block} block_item`} style={{backgroundImage: `url(/img/main_tab/achievements.jpg)`}}>
      <div className={styles.achievents_inner}>
        {achievementsData.map((achievement, index) => {
          return <AchievementsItem name={achievement.name} number={achievement.number} key={achievement.name + index.toString()} />
        })}
      </div>
    </div>
  );
}

function AchievementsItem({ number, name }) {
  return (
    <div className={styles.achievements_item}>
      <div className={styles.achievements_number}>{number}</div>
      <div className={styles.achievements_name}>{name}</div>
    </div>
  );
}

export default Achievements;