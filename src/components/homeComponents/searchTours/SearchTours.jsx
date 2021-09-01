import React, { useState, useEffect, useContext } from "react";
import { WrapperContext, SearchTourForm } from "../../../Context";
import Headline from "../../common/headline/Headline";
import "./searchTours.css";

function SearchTour() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale)), [wrapper.lang]);

  const selectsData = [
    {
      selectName: 'destination',
      title: locales.destination,
      options: [
        {
          value: 'all_destinations',
          title: locales.allDestinations
        },
        {
          value: 'europe',
          title: locales.europe
        },
        {
          value: 'italy',
          title: `\u00A0 - ${locales.italy}`
        },
        {
          value: 'netherlands',
          title: `\u00A0 - ${locales.netherlands}`
        },
        {
          value: 'asia',
          title: locales.asia
        },
        {
          value: 'thailandia',
          title: `\u00A0 - ${locales.thailandia}`
        },
        {
          value: 'united_states',
          title: locales.unitedStates
        },
        {
          value: 'oceania',
          title: locales.oceania
        }
      ]
    },
    {
      selectName: 'typology',
      title: locales.typology,
      options: [
        {
          value: 'all_typologies',
          title: locales.allTypologies
        },
        {
          value: 'relax',
          title: locales.relax
        },
        {
          value: 'cultural',
          title: locales.cultural
        },
        {
          value: 'sport',
          title: locales.sport
        },
        {
          value: 'history',
          title: locales.history
        }
      ]
    },
    {
      selectName: 'durations',
      title: locales.durations,
      options: [
        {
          value: 'all_durations',
          title: locales.allDurations
        },
        {
          value: '1-3_days',
          title: locales.days1_3
        },
        {
          value: '3-6_days',
          title: locales.days3_6
        },
        {
          value: '6-9_days',
          title: locales.days6_9
        },
        {
          value: '9-12_days',
          title: locales.days9_12
        }
      ]
    },
    {
      selectName: 'difficulty',
      title: locales.difficulty,
      options: [
        {
          value: 'all_difficulty',
          title: locales.allDifficulty
        },
        {
          value: 'high',
          title: locales.high
        },
        {
          value: 'low',
          title: locales.low
        },
        {
          value: 'medium',
          title: locales.medium
        }
      ]
    },
    {
      selectName: 'minAge',
      title: locales.minAge,
      options: [
        {
          value: 'all_age',
          title: locales.allAge
        },
        {
          value: '10_years',
          title: locales.years10
        },
        {
          value: '18_years',
          title: locales.years18
        },
        {
          value: '3_years',
          title: locales.years3
        }
      ]
    }
  ];

  function submitForm(e) {
    e.preventDefault();
    console.log('Send');
  }

  return (
    <SearchTourForm.Provider value={{submitFn: submitForm, submitLocale: locales.search}}>
      <div className="search_block block_item" style={{backgroundImage: `url(/img/main_tab/search_tour.jpg)`}}>
        <Headline title={locales.searchTour} light />

        <SearchForm selects={selectsData} />
      </div>
    </SearchTourForm.Provider>
  );
}

function SearchForm({ selects }) {
  return (
    <form name="search" className="search_tour">
      {selects.map(select => {
        return <Selects title={select.title} options={select.options} selectName={select.selectName} key={select.selectName} />
      })}

      <SubmitBtn />
    </form>
  );
}

function Selects({ title, options, selectName }) {
  return (
    <div className="select_wrapper">
      <h6 className="title">{title}</h6>

      <select name={selectName}>
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
  const {submitLocale, submitFn} = useContext(SearchTourForm);

  return (
    <div className="submit_wrapper">
      <button className="submit_form" onClick={submitFn}>{submitLocale}</button>
    </div>
  );
}

export default SearchTour;
