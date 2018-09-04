/**
 * @name: MyPrompt
 * @desc: 表单提交, 编辑 离开当前页提示
 * @param: when: 是否开启 boolean, message: 提示信息 string | ReactNode
 */

import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

class MyPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      when: props.when
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.when !== this.state.when) {
      this.setState({ when: nextProps.when });
    }
  }
  render() {
    const { when } = this.state;
    return <Prompt when={when} message={this.props.message} />;
  }
}

MyPrompt.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};
MyPrompt.defaultProps = {
  when: false,
  message: location => {
    const leave = location.pathname.startsWith('/Login');
    const ref = Modal.info({
      title: '即将离开当前页面!',
      maskClosable: false,
      onOk() {
        ref.destroy();
        return leave;
      }
    });
  }
};
export default MyPrompt;
