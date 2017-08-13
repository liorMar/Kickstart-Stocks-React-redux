import React from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import s from './App.scss';
import StocksApp from '../StocksApp/StocksApp';

function App({t, stocks, onChangeHandler}) {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2>{t('app.title')}</h2>
      </div>
      <StocksApp stocks={stocks} onChangeHandler={onChangeHandler}/>
    </div>
  );
}

App.propTypes = {
  t: PropTypes.func,
  stocks: PropTypes.array,
  onChangeHandler: PropTypes.func
};

export default translate(null, {wait: true})(App);
