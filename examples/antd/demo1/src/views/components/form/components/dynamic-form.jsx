import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
let uuid = 0;
const DynamicForm = ({
  form,
}) => {
  const { getFieldValue, getFieldDecorator, validateFields, setFieldsValue } = form;
  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');

  const remove = (key) => {
    const keys = getFieldValue('keys');
    if (keys.lenght === 1) return;
    const newKeys = keys.filter(item => item !== key);
    setFieldsValue({ keys: newKeys });
  };

  const add = () => {
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    setFieldsValue({ keys: nextKeys });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const formItems = keys.map((k, index) => {
    return (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            message: "Please input passenger's name or delete this field.",
          }],
        })(
          <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => remove(k)}
          />
        ) : null}
      </FormItem>
    );
  });
  return (
    <Form onSubmit={handleSubmit}>
      {formItems}
      <FormItem
        {...formItemLayoutWithOutLabel}
      >
        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </FormItem>
      <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
    </Form>
  );
}

export default Form.create()(DynamicForm);
