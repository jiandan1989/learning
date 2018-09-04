import React, { Component } from 'react';
// import echarts from 'echarts';

import { Row, Col } from 'antd';

// import { lineData } from '../../../mock/echarts';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row gutter={24}>
        <Col span={12}>1</Col>
      </Row>
    );
  }
}

export default LineChart;
