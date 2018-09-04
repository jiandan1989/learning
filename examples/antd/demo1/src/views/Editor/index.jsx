import React, { Component } from 'react';
import { Select, Row, Col } from 'antd';

import { CodeEditor } from '../../common';
import THEMES from '../../constants/themes';

import './index.less';

const Option = Select.Option;

const themes = THEMES.map(key => (
  <Option key={key} value={key}>
    {key}
  </Option>
));
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'abcdef',
      config: {
        theme: 'default',
        readOnly: true,
      },
    };
  }

  changeValue = (key, val) => {
    this.setState(prevState => ({
      config: {
        ...prevState.config,
        [key]: val,
      }
    }));
  };
  render() {
    const { config } = this.state;
    console.log(config);
    return (
      <div className="editor_warpper">
        <Row className="editor_header" gutter={24}>
          <Col span={12}>
            <span>主题: </span>
            <Select
              style={{ minWidth: 160 }}
              onChange={(val) => { this.changeValue('theme', val) }}
              value={config.theme}
            >
              {themes}
            </Select>
          </Col>
        </Row>
        <CodeEditor config={config} />
      </div>
    );
  }
}

export default Editor;
