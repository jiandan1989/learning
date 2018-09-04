import React, { PureComponent } from 'react';

import { Collapse } from 'antd';

import DynamicForm from './components/dynamic-form';
import MoreForm from './components/more-form';

const { Panel } = Collapse;

class FormComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
     <div className="form-component-wrapper">
      <Collapse defaultActiveKey='more'>
        <Panel header="动态表单" key="dynamic">
          <DynamicForm />
        </Panel>
        <Panel header="多个getFieldDecorator" key="more">
          <MoreForm />
        </Panel>
      </Collapse>
     </div>
    );
  }
}

export default FormComponent;
