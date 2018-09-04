import React from 'react';
import { Card } from 'antd';

const Weather = props => {
  console.log(props);
  return (
    <Card bordered={false} style={{ height: 170, overflowY: 'auto' }}>
      Weather1
    </Card>
  );
};

export default Weather;
