/**
 * @name: Counter 计时器
 */

import React from 'react';

import { Button, Icon } from 'antd';

import './index.less';

const Counter = props => {
  return (
    <div className="warpper">
      <Button type="primary" size="small" onClick={props.onIncrement}>
        <Icon type="plus" />
      </Button>
      <span>{props.value}</span>
      <Button type="primary" size="small" onClick={props.onDecrement}>
        <Icon type="minus" />
      </Button>
    </div>
  );
};

export default Counter;
