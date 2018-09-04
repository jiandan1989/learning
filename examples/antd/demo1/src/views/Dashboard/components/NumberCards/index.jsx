import React from 'react';

import { Card, Icon } from 'antd';
import CountUp from 'react-countup';

import './index.less';

const NumberCards = ({ icon, number, title, color }) => (
  <Card
    bodyStyle={{ padding: 0 }}
    bordered={false}
    className="number_card clearfix"
  >
    <Icon
      style={{ color }}
      className="icon_warpper"
      type={icon}
    />
    <div className="content">
      <h5 className="content_title">{title}</h5>
      <div>
        <CountUp
          start={0}
          end={number}
          duration={2.75}
          useEasing
          useGrouping
          separator=" "
          decimal=","
        />
      </div>
    </div>
  </Card>
);

export default NumberCards;
