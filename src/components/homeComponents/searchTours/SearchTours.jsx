import React, { useState, useEffect, useContext } from "react";
import { WrapperContext, SearchTourForm } from "../../../Context";
import Headline from "../../common/headline/Headline";
import "./searchTours.css";

function SearchTour() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});

  useEffect(() => import(`./${wrapper.lang}Locale`).then((locale) => setLocales(locale.locale)), [wrapper.lang]);

  const selectsData = [
    {
      selectName: 'destination',
      title: 'Destination',
      options: [
        {
          value: 'all_destinations',
          title: 'All Destinations'
        },
        {
          value: 'europe',
          title: 'Europe'
        },
        {
          value: 'italy',
          title: '\u00A0 - Italy'
        },
        {
          value: 'netherlands',
          title: '\u00A0 - Netherlands'
        },
        {
          value: 'asia',
          title: 'Asia'
        },
        {
          value: 'thailandia',
          title: '\u00A0 - Thailandia'
        },
        {
          value: 'united_states',
          title: 'United States'
        },
        {
          value: 'oceania',
          title: 'Oceania'
        }
      ]
    },
    {
      selectName: 'typology',
      title: 'Typology',
      options: [
        {
          value: 'All Typologies',
          title: 'All Typologies'
        },
        {
          value: 'Relax',
          title: 'Relax'
        },
        {
          value: 'Cultural',
          title: 'Cultural'
        },
        {
          value: 'Sport',
          title: 'Sport'
        },
        {
          value: 'History',
          title: 'History'
        }
      ]
    },
    {
      selectName: 'durations',
      title: 'Durations',
      options: [
        {
          value: 'all_durations',
          title: 'All Durations'
        },
        {
          value: '1-3_days',
          title: '1 - 3 Days'
        },
        {
          value: '3-6_days',
          title: '3 - 6 Days'
        },
        {
          value: '6-9_days',
          title: '6 - 9 Days'
        },
        {
          value: '9-12_days',
          title: '9 - 12 Days'
        }
      ]
    },
    {
      selectName: 'difficulty',
      title: 'Difficulty',
      options: [
        {
          value: 'all_difficulty',
          title: 'All Difficulty'
        },
        {
          value: 'high',
          title: 'High'
        },
        {
          value: 'low',
          title: 'Low'
        },
        {
          value: 'medium',
          title: 'Medium'
        }
      ]
    },
    {
      selectName: 'minAge',
      title: 'Min Age',
      options: [
        {
          value: 'all_age',
          title: 'All Age'
        },
        {
          value: '10_years',
          title: '10 Years'
        },
        {
          value: '18_years',
          title: '18 years'
        },
        {
          value: '3_years',
          title: '3 Years'
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
      <div className="search_block block_item" style={{backgroundImage: `url(./img/search_tour.jpg)`}}>
        <Headline title={locales.searchTour} light />

        <SearchForm selects={selectsData} />
      </div>
    </SearchTourForm.Provider>
  );
}

function SearchForm( {selects} ) {
  return (
    <form name="search" className="search_tour">
      {selects.map(select => {
        return <Selects title={select.title} options={select.options} selectName={select.selectName} key={select.selectName} />
      })}

      <SubmitBtn />
    </form>
  );
}

function Selects( {title, options, selectName} ) {
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

function Options( {value, title} ) {
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
