import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';

import { MyCard } from '../../common';

import { EchartList } from '../../constants';

const EchartsIndexPage = () => (
  <Row gutter={24}>
    {EchartList.map(item => (
      <Col style={{ marginBottom: 12 }} xl={4} lg={8} md={12} key={item.key}>
        <NavLink to={item.link}>
          <MyCard {...item} />
        </NavLink>
      </Col>
    ))}
  </Row>
);

export default EchartsIndexPage;
