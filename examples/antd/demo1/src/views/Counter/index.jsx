import React, { Component } from 'react';
import { connect } from 'react-redux';

import Counter from '../../components/Counter';

class CounterView extends Component {
  render() {
    const { count, dispatch } = this.props;
    return (
      <Counter
        value={count}
        onIncrement={() => dispatch({ type: 'INCREMENT' })}
        onDecrement={() => dispatch({ type: 'DECREMENT' })}
      />
    );
  }
}

function mapStateToProps({ count }) {
  return {
    count,
  };
}
export default connect(mapStateToProps)(CounterView);
