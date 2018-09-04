import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import {
  NumberCards,
  YearlySales,
  Weather,
  Quote,
  Comments,
  RecentSales,
  Completed,
  Browser,
  Cpu,
  User,
} from './components';
import { numbers, completed } from '../../mock/dashboard';

class Dashboard extends Component {
  render() {
    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCards {...item} />
      </Col>
    ));
    return (
      <div>
        <Row className="row_warpper" style={{ marginBottom: 16 }} gutter={24}>
          {numberCards}
        </Row>
        <Row className="row_warpper" style={{ marginBottom: 16 }} gutter={24}>
          <Col lg={18} md={24}>
            <div>占位</div>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Weather />
              </Col>
              <Col lg={24} md={12}>
                <Quote />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row_warpper" style={{ marginBottom: 16 }} gutter={24}>
          <Col lg={12} md={24}>
            <RecentSales />
          </Col>
          <Col lg={12} md={24}>
            <Comments />
          </Col>
        </Row>
        <Row className="row_warpper" style={{ marginBottom: 16 }}>
          <Col lg={24} md={24}>
            <Completed data={completed} />
          </Col>
          <Col span={24}>
            <YearlySales />
          </Col>
        </Row>
        <Row className="row_warpper" style={{ marginBottom: 16 }} gutter={24}>
          <Col lg={8} md={24}>
            <Browser />
          </Col>
          <Col lg={8} md={24}>
            <Cpu />
          </Col>
          <Col lg={8} md={24}>
            <User />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(Dashboard);
