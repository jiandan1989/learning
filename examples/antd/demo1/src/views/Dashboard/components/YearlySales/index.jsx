import React, { Component } from 'react';
import { Radio, Card, Tooltip, Row, Col, Icon } from 'antd';
import { CirclePicker } from 'react-color';
import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set';

import { yearSales } from '../../../../mock/dashboard';
import './index.less';

const data = yearSales.list;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const POS = ['top', 'right', 'bottom', 'left'];

const basePos = {
  top: 60,
  right: 50,
  left: 50,
  bottom: 50,
};

class YearlySales extends Component {
  constructor() {
    super();
    this.yearChart = null;
    this.chartRef = React.createRef();
    this.state = {
      pos: 'top', // 'top', 'left', 'right', 'bottom'
      padSize: basePos,
      displayColorPicker: false,
      color: 'rgba(0, 0, 0, 1)',
    };
  }
  componentDidMount() {
    this.initChart();
  }
  initChart() {
    if (this.yearChart !== null && typeof this.yearChart.destroy === 'function') {
      this.yearChart.destroy();
    }
    const { padSize, pos, color } = this.state;
    const container = this.chartRef.current;
    this.yearChart = new G2.Chart({
      container,
      forceFit: true,
      height: 350,
      padding: padSize,
      background: {
        fill: color,
        fillOpacity: 0.8,
        stroke: '#eee',
        strokeOpacity: 0.6,
        opacity: 0.9,
        lineWidth: 0.8,
      },
    });
    this.yearChart.axis('name', {
      label: {
        formatter: val => {
          return `${val}年`;
        },
      },
      // tickLine: {
      //   stroke: 'red',
      //   lineWidth: 5,
      // }
    });
    const { yearChart } = this;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Clothes', 'Food', 'Electronics'],
      key: 'species',
      value: 'num',
    });
    yearChart.source(dv, {
      name: {
        range: [0, 1],
      },
    });
    yearChart.tooltip({
      triggerOn: 'mousemove',
      // enterable: true,
      crosshairs: {
        type: 'line',
      },
    });
    yearChart.axis('num', {
      label: {
        formatter: val => val,
      },
    });
    yearChart.legend({
      position: pos,
      marker: 'circle',
      textStyle: {
        fontSize: 10,
        fontWeigth: 'bold',
        rotate: -15,
      },
      // hoverable: false,
      // onHover: ev => {
      //   console.log(ev);
      // },
      // clickable: false,
      // onClick: ev => {
      //   console.log(ev);
      // }
      // layout: 'vertical',
      // title: {
      //   textAlign: 'middle', // 文本对齐方向，可取值为： start middle end
      //   fill: '#404040', // 文本的颜色
      //   fontSize: '12', // 文本大小
      //   fontWeight: 'bold', // 文本粗细
      //   rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      //   textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
      // }
    });
    yearChart
      .line()
      .position('name*num')
      .color('species')
      .shape('smooth');
    yearChart
      .point()
      .position('name*num')
      .color('species')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    yearChart.render();
  }
  changePos = e => {
    const pos = e.target.value;
    this.setState(
      {
        pos,
        padSize: {
          ...basePos,
          [pos]: pos === 'top' || pos === 'bottom' ? 60 : 130,
        },
      },
      () => {
        this.initChart();
      }
    );
  };

  closePicker = () => {
    this.setState({ displayColorPicker: false });
  }
  openPicker = () => {
    this.setState({ displayColorPicker: true });
  }
  setColor = (color) => {
    const { rgb: { r, g, b, a } } = color;
    this.setState({
      color: `rgba(${r}, ${g}, ${b}, ${a})`,
      displayColorPicker: false,
    }, () => {
      this.initChart();
    });
  }
  render() {
    const warpperStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
    };
    const { pos, displayColorPicker, color } = this.state;
    const tipTitle = (
      <Card
        bodyStyle={{ padding: 16 }}
        style={{ borderColor: color, borderRadius: 8 }}
      >
        <CirclePicker onChange={this.setColor} />
      </Card>);

    const radioList = POS.map(key => (
      <RadioButton key={key} value={key}>{`${key[0].toUpperCase()}${key.slice(1)}`}</RadioButton>
    ));
    return (
      <div style={warpperStyle}>
        <Row gutter={24}>
          <Col span={8}>
            <RadioGroup
              onChange={this.changePos}
              size="small"
              value={pos}
            >
              {radioList}
            </RadioGroup>
          </Col>
          <Col span={5}>
            <Tooltip
              overlayClassName="color-tip-wrapper"
              visible={displayColorPicker}
              trigger="click"
              title={tipTitle}
            >
              <Icon
                onClick={this.openPicker}
                style={{ color, fontSize: 24 }}
                type="check-square"
              />
            </Tooltip>
          </Col>
        </Row>
        <div ref={this.chartRef} />
      </div>
    );
  }
}

export default YearlySales;
