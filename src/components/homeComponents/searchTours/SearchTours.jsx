import React, { useState, useEffect, useContext } from 'react';
import { WrapperContext, SearchTourForm } from '../../../Context';
import Headline from '../../common/headline/Headline';
import styles from './SearchTours.module.css';

function SearchTour() {
  const wrapper = useContext(WrapperContext);
  const [locales, setLocales] = useState({});
  const [formData, setFormData] = useState();
  const [sendData, setSendData] = useState({});

  useEffect(() => {
    import(`./locales/${wrapper.lang}`).then(locale => setLocales(locale.locale));
    import(`./formData/${wrapper.lang}`).then(formData => setFormData(formData.selectsData));
  }, [wrapper.lang]);

  useEffect(() => {
    if (formData === undefined) return;

    formData.map(data => sendData[data.selectName] = data.options[0].value);
    setSendData(sendData);
  }, [formData, sendData]);

  function submitForm(e) {
    e.preventDefault();
    console.log(JSON.stringify(sendData));
  }

  function recordValues(e) {
    sendData[e.target.name] = e.target.value;
    setSendData(sendData);
  }

  return (
    <SearchTourForm.Provider value={{submitFn: submitForm, recordValues: recordValues, submitLocale: locales.search}}>
      <div className={`${styles.search_block} block_item`} style={{backgroundImage: `url(/img/main_tab/search_tour.jpg)`}}>
        <Headline title={locales.searchTour} light />

        <SearchForm selects={formData || []} />
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
