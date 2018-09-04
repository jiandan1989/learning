/**
 * @name: 主视图
 * @TODO: 拆分
 */

import React, { Component } from 'react';
import { Layout, Icon, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MySider from './components/MySider';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import Breadcrumb from './components/Breadcrumb';

import './index.less';

const { Content } = Layout;

class LayoutApp extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };
  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout className="app-warpper">
        <MySider location={location} collapsed={collapsed} />
        <Layout
          className="layout_content"
          style={{ background: 'transparent' }}
        >
          <MyHeader collapsed={collapsed} toggle={this.toggle} />
          <Content className="content_wrapper">
            <Breadcrumb
              pathArr={location.pathname.replace('/', '').split('/')}
            />
            <BackTop>
              <div className="back-to-top">
                <Icon type="arrow-up" />
              </div>
            </BackTop>
            <div style={{ paddingTop: 16 }}>{this.props.children}</div>
          </Content>
          <MyFooter />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect()(LayoutApp));
