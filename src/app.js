import 'babel-polyfill';
import React from 'react';
import axios from 'axios';
import {I18nextProvider} from 'react-i18next';
import {wixAxiosConfig} from 'wix-axios-config';
import App from './components/App';
import i18n from './i18n';

import {render} from 'react-dom';
import {createStore} from 'redux';
import stocks from './stocks/stocks';

const baseUrl = window.__BASEURL__;
const locale = window.__LOCALE__;
const staticsBaseUrl = window.__STATICS_BASE_URL__;

wixAxiosConfig(axios, {baseURL: baseUrl});


/* redux */
const SET_STOCKS = 'set-stocks';
const SET_SEARCH_TERM = 'set-search-term';
const setStocks = stocks => ({type: SET_STOCKS, stocks});
const setSearchTerm = searchTerm => ({type: SET_SEARCH_TERM, searchTerm});

const defaultState = {
  stocks: [],
  searchTerm: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_STOCKS:
      return {...state, stocks: action.stocks};
    case SET_SEARCH_TERM:
      return {...state, searchTerm: action.searchTerm};
    default:
      return state;
  }
};

const store = createStore(reducer);

const autoSearch = () => {
  const searchTerm = store.getState().searchTerm;

  if (searchTerm === '') {
    store.dispatch(setStocks([]));
  } else {
    stocks.searchStocks(searchTerm).then(stocks => {
      store.dispatch(setStocks(stocks));
    });
  }
};

const onChangeHandler = searchTerm => {
  store.dispatch(setSearchTerm(searchTerm));
};

const renderApp = () => {
  render(
    <I18nextProvider i18n={i18n({locale, baseUrl: staticsBaseUrl})}>
      <App stocks={store.getState().stocks} onChangeHandler={onChangeHandler}/>
    </I18nextProvider>,
    document.getElementById('root')
  );
};

store.subscribe(renderApp);

setInterval(autoSearch, 3000);

renderApp();
