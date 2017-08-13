import React, {Component} from 'react';
import s from './StocksApp.scss';
import stocks from '../../stocks/stocks';
import {map} from 'lodash/fp';
import Stock from '../Stock/Stock';

class StocksApp extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      stocks: []
    };
  }

  onChangeHandler(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  search() {
    if (this.state.searchTerm === '') {
      this.setState({stocks: []});
    } else {
      stocks.searchStocks(this.state.searchTerm).then(stocks => {
        this.setState({stocks});
      });
    }
  }

  render() {
    return (
      <div className={s['stocks-app']}>
        <input type="text" id="searchTerm" value={this.state.searchTerm} onChange={e => this.onChangeHandler(e)}/>
        <button onClick={() => this.search()}>Search</button>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {map(stockData => <Stock key={stockData.symbol} stock={stockData}/>, this.state.stocks)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StocksApp;
