/**
 * @name: MoreForm
 * @desc: 一个 FormItem 多个getFieldDecorator 使用
 */

import React from 'react';
import { Form, DatePicker, Button, Message } from 'antd';

import { formatDate } from '../../../../utils';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const MoreForm = ({ form }) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
  getFieldDecorator('times', { initialValue: { start: '', end: '' } });
  const keys = getFieldValue('times');
  const changeDate = (key, date) => {
    console.log(formatDate(date));
    const values = getFieldValue('times');
    const newVals = { ...values, [key]: date };
    setFieldsValue({ times: newVals });
  };
  const formItems = Object.keys(keys).map((key, index) => {
    return (
      <span key={key}>
        {getFieldDecorator(key)(
          <DatePicker onChange={(val) => { changeDate(key, val); }} />
        )}
        {index === 0 && <span style={{ padding: 10 }}>-</span>}
      </span>
    );
  });
  const getValues = (e) => {
    e.preventDefault();
    const values = getFieldValue('times');
    const newVals = {
      start: formatDate(values.start),
      end: formatDate(values.end),
    };
    Message.success((
      <div>
        <code>
          {JSON.stringify(values, null, 2)}
        </code>
        <hr />
        <code>{JSON.stringify(newVals, null, 2)}</code>
      </div>
      ), 5);
  };
  return (
    <Form>
      <FormItem {...formItemLayout} label="时间">
        {formItems}
        <span>&nbsp;</span>
        <Button onClick={getValues}> click me </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create()(MoreForm);
