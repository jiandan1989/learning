import React, { Component } from 'react';

import { Form, Input, Card } from 'antd';
import './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      when: false,
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login_warpper">
        <Card className="login_form">
          <Form>
            <FormItem {...formItemLayout} hasFeedback label="username">
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  onChange={() => {
                    this.setState({ when: true });
                  }}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} hasFeedback label="password">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(<Input placeholder="Password" />)}
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);
export default LoginForm;
