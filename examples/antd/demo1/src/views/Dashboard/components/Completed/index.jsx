/**
 * @name: Completed
 * @desc: G2 图表
 */

import React, { Component } from 'react';
import { Card, Icon, Button, Select, Row, Col, Collapse, message } from 'antd';

import { DataSet } from '@antv/data-set';
import G2 from '@antv/g2';

import './index.less';
import {
  getG2Config,
  getDrawFn,
  baseShape
} from '../../../../utils/getG2Config';
import { DRAWTYPES } from '../../../../constants';

const { Panel } = Collapse;
const { Option, OptGroup } = Select;
const { DataView } = DataSet;

const optGroupList = (optList, shape) =>
  Object.keys(optList).map(key => (
    <Option value={key} key={key} shape={shape}>
      {optList[key]}
    </Option>
  ));
const selectList = Object.keys(DRAWTYPES).map(optKey => (
  <OptGroup label={DRAWTYPES[optKey].label} key={optKey}>
    {optGroupList(DRAWTYPES[optKey].children, DRAWTYPES[optKey].shape)}
  </OptGroup>
));

const rowSpan = {
  sm: { span: 12 },
  md: { span: 8 },
  lg: { span: 6 }
};

class Completed extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.dv = new DataView();

    this.state = {
      data: props.data,
      drawType: 'basicArea',
      shape: baseShape,
      shapeList: { area: ['area', 'smooth', 'line', 'smoothLine'] }
    };
  }
  componentDidMount() {
    const container = this.chartRef.current;
    this.chart = new G2.Chart({
      container,
      forceFit: true,
      height: 400
    });
    this.dv.source(this.state.data);
    const { drawType } = this.state;
    const config = getG2Config(drawType);
    // 关闭点击 legend
    this.dv.transform(config);
    setTimeout(() => {
      this.initChart();
    }, 0);
  }

  initChart() {
    if (this.chart && typeof this.chart.clear === 'function') {
      this.chart.clear(); // 清空图表
    }
    const { shape, drawType } = this.state;
    this.chart.legend({
      marker: 'circle'
    });
    this.chart.source(this.dv, {
      name: {
        range: [0, 1]
      }
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });

    const fn = getDrawFn(this.chart, drawType, shape);
    fn();
    // this.chart.area().position('name*value').color('type');
    this.chart.render();
  }

  addData = () => {
    const item = {
      name: `${Math.floor(Math.random() * 100) + 2020}`,
      'Task complete': Math.floor(Math.random() * 1000),
      'Cards Complete': Math.ceil(Math.random() * 1000)
    };
    this.setState(
      prevState => {
        const data = [...prevState.data, item].sort((a, b) => a.name - b.name);
        return {
          data
        };
      },
      () => {
        this.dv.source(this.state.data);
      }
    );
  };

  minusData = () => {
    if (this.state.data.length <= 2) {
      message.error('不能再减了, 再减就没啦!');
      return;
    };
    this.setState(prevState => {
      prevState.data.pop();
      return {
        data: prevState.data,
      }
    }, () => {
      this.dv.source(this.state.data);
    });
  }
  setDrawType = (value, { props }) => {
    this.setState(
      {
        drawType: value,
        shapeList: props.shape,
        shape: baseShape
      },
      () => {
        this.initChart();
      }
    );
  };

  setShape = (key, value) => {
    this.setState(
      prevState => ({
        shape: {
          ...prevState.shape,
          [key]: value
        }
      }),
      () => {
        this.initChart();
      }
    );
  };

  getShape = key => {
    const getType = type => type[0].toUpperCase() + type.slice(1);
    const type =
      Object.keys(DRAWTYPES).find(item => key.includes(getType(item))) ||
      'line';
    return DRAWTYPES[type];
  };

  render() {
    const { drawType, shapeList, shape, data: currentData } = this.state;
    const currentConfig = {
      drawType,
      shapeList,
      shape
    };
    return (
      <Card className="chart-wrapper" bordered={false}>
        <Row className="operates" gutter={24}>
          <Col {...rowSpan}>
            <span>绘图类型: </span>
            <Select
              value={drawType}
              onChange={this.setDrawType}
              style={{ width: 180 }}
            >
              {selectList}
            </Select>
          </Col>
          {Object.keys(shapeList).map(key => (
            <Col {...rowSpan} key={key}>
              <span>绘图形状: </span>
              <Select
                onChange={value => {
                  this.setShape(key, value);
                }}
                value={shape[key]}
                style={{ width: 180 }}
              >
                {shapeList[key].map(opt => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            </Col>
          ))}
          <Col {...rowSpan}>
            <Button type="primary" size="small" onClick={this.addData}>
              <Icon type="plus" />
            </Button>
            &nbsp;
            <Button type="primary" size="small" onClick={this.minusData}>
              <Icon type="minus" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Collapse defaultActiveKey={[]}>
              <Panel header="当前选项JSON" key="json">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<pre>${JSON.stringify(
                      currentConfig,
                      null,
                      2
                    )}</pre>`
                  }}
                />
              </Panel>
              <Panel header="当前数据" key="currentData">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<pre>${JSON.stringify(currentData, null, 2)}</pre>`
                  }}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <div className="complete-chart" ref={this.chartRef} />
      </Card>
    );
  }
}

export default Completed;
