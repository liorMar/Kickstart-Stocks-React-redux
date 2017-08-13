import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Stock extends PureComponent {
  render() {
    return (
      <tr>
        <td>
          {this.props.stock.symbol}
        </td>
        <td>
          {this.props.stock.name}
        </td>
        <td>
          {this.props.stock.price}
        </td>
        <td>
          {this.props.stock.change}
        </td>
      </tr>
    );
  }
}

Stock.propTypes = {
  stock: PropTypes.object
};

export default Stock;
