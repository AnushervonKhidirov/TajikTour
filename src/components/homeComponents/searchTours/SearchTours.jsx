import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext, SearchTourForm } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './SearchTours.module.css';

function SearchTour() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const selectsData = [
    {
      selectName: 'Destination',
      title: locales.destination,
      options: [
        {
          value: 'All Destinations',
          title: locales.allDestinations
        },
        {
          value: 'Europe',
          title: locales.europe
        },
        {
          value: 'Italy',
          title: `\u00A0 - ${locales.italy}`
        },
        {
          value: 'Netherlands',
          title: `\u00A0 - ${locales.netherlands}`
        },
        {
          value: 'Asia',
          title: locales.asia
        },
        {
          value: 'Thailandia',
          title: `\u00A0 - ${locales.thailandia}`
        },
        {
          value: 'United States',
          title: locales.unitedStates
        },
        {
          value: 'Oceania',
          title: locales.oceania
        }
      ]
    },
    {
      selectName: 'Typology',
      title: locales.typology,
      options: [
        {
          value: 'All Typologies',
          title: locales.allTypologies
        },
        {
          value: 'Relax',
          title: locales.relax
        },
        {
          value: 'Cultural',
          title: locales.cultural
        },
        {
          value: 'Sport',
          title: locales.sport
        },
        {
          value: 'History',
          title: locales.history
        }
      ]
    },
    {
      selectName: 'Durations',
      title: locales.durations,
      options: [
        {
          value: 'All Durations',
          title: locales.allDurations
        },
        {
          value: '1 - 3 days',
          title: locales.days1_3
        },
        {
          value: '3 - 6 days',
          title: locales.days3_6
        },
        {
          value: '6 - 9 days',
          title: locales.days6_9
        },
        {
          value: '9 - 12 days',
          title: locales.days9_12
        }
      ]
    },
    {
      selectName: 'Difficulty',
      title: locales.difficulty,
      options: [
        {
          value: 'All Difficulty',
          title: locales.allDifficulty
        },
        {
          value: 'High',
          title: locales.high
        },
        {
          value: 'Low',
          title: locales.low
        },
        {
          value: 'Medium',
          title: locales.medium
        }
      ]
    },
    {
      selectName: 'Min Age',
      title: locales.minAge,
      options: [
        {
          value: 'All Age',
          title: locales.allAge
        },
        {
          value: '10 years',
          title: locales.years10
        },
        {
          value: '18 years',
          title: locales.years18
        },
        {
          value: '3 years',
          title: locales.years3
        }
      ]
    }
  ];

  function submitForm(e) {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  }

  function recordValues(e) {
    let selectsValue = {};
    selectsValue[e.target.name] = e.target.value;
    setFormData(Object.assign(formData, selectsValue));
  }

  return (
    <SearchTourForm.Provider value={{submitFn: submitForm, recordValues: recordValues, submitLocale: locales.search}}>
      <div className={`${styles.search_block} block_item`} style={{backgroundImage: `url(/img/main_tab/search_tour.jpg)`}}>
        <Headline title={locales.searchTour} light />

        <SearchForm selects={selectsData} />
      </div>
    </SearchTourForm.Provider>
  );
}

function SearchForm({ selects }) {
  const { submitFn } = useContext(SearchTourForm);
  return (
    <form name="search" className={styles.search_tour} onSubmit={e => submitFn(e)}>
      {selects.map(select => {
        return <Selects title={select.title} options={select.options} selectName={select.selectName} key={select.selectName} />
      })}

      <SubmitBtn />
    </form>
  );
}

function Selects({ title, options, selectName }) {
  const { recordValues } = useContext(SearchTourForm);

  return (
    <div className={styles.select_wrapper}>
      <h6 className={styles.title}>{title}</h6>

      <select name={selectName} onChange={e => recordValues(e)}>
        {options.map(option => {
          return <Options value={option.value} title={option.title} key={option.value} />
        })}
      </select>
    </div>
  );
}

function Options({ value, title }) {
  return (
    <option value={value}>{title}</option>
  );
}

function SubmitBtn() {
  const { submitLocale } = useContext(SearchTourForm);

  return (
    <div className={styles.submit_wrapper}>
      <button className={styles.submit_form}>{submitLocale}</button>
    </div>
  );
}

export default SearchTour;
