import React, {Component} from 'react';
import s from './StocksApp.scss';
import PropTypes from 'prop-types';
import {map} from 'lodash/fp';
import Stock from '../Stock/Stock';

class StocksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  onChangeHandler(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className={s['stocks-app']}>
        <input type="text" id="searchTerm" value={this.state.searchTerm} onChange={e => this.onChangeHandler(e)}/>
        <button onClick={() => this.props.searchHandler(this.state.searchTerm)}>Search</button>
        {this.props.stocks.length ?
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
              {map(stockData => <Stock key={stockData.symbol} stock={stockData}/>, this.props.stocks)}
            </tbody>
          </table> :
          <div>Search for a stock...</div>}
      </div>
    );
  }
}

StocksApp.propTypes = {
  stocks: PropTypes.array,
  searchHandler: PropTypes.func
};

export default StocksApp;
