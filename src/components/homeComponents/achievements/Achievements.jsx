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
      number: 10
    },
    {
      name: locales.satisfiedCustomers,
      number: 1000
    },
    {
      name: locales.partners,
      number: 50
    },
    {
      name: locales.travelDestinations,
      number: 100
    }
  ]

  return (
    <div className={`${styles.achievements_block} block_item`} style={{backgroundImage: `url(/img/main_tab/achievements.jpg)`}}>
      <div className={styles.achievents_inner}>
        {achievementsData.map((achievement, index) => {
          return <AchievementsItem name={achievement.name} number={achievement.number} moreText={locales.moreText} key={achievement.name + index.toString()} />
        })}
      </div>
    </div>
  );
}

function AchievementsItem({ number, name, moreText }) {
  return (
    <div className={styles.achievements_item}>
      <div className={styles.more}>{moreText}</div>
      <div className={styles.achievements_number}>{number}</div>
      <div className={styles.achievements_name}>{name}</div>
    </div>
  );
}

export default Achievements;