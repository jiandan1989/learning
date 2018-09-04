/**
 * @name: MyCard
 * @desc: Card
 */

import React from 'react';
import { Card } from 'antd';

// import PropTypes from 'prop-types';

const MyCard = props => (
  <Card {...props}>
    <h4>{props.desc}</h4>
    <img style={{ width: '100%' }} src={props.url} alt={props.alt} />
  </Card>
);

MyCard.defaultProps = {
  hoverable: true,
  bordered: false,
  bodyStyle: {
    padding: '8px 16px'
  },
  url: '',
  alt: '占位符',
  desc: 'Basic'
};

export default MyCard;
