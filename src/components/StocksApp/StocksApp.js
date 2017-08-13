import React, {PureComponent} from 'react';
import s from './StocksApp.scss';
import PropTypes from 'prop-types';
import {map} from 'lodash/fp';
import Stock from '../Stock/Stock';

class StocksApp extends PureComponent {
  render() {
    return (
      <div className={s['stocks-app']}>
        <input type="text" placeholder="Search..." onChange={e => this.props.onChangeHandler(e.target.value)}/>
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
  onChangeHandler: PropTypes.func

};

export default StocksApp;
