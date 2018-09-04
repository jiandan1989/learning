/**
 * @name: MyHeader
 * @desc: Header
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, message } from 'antd';

const { Header } = Layout;
const { SubMenu } = Menu;

const MyHeader = ({ collapsed, toggle }) => {
  return (
    <Header className="content_header">
      <div
        style={{ pointer: 'cursor' }}
        onClick={() => {
          toggle();
        }}
      >
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
        />
      </div>
      <Menu
        onClick={({ key }) => {
          if (key === 'logout') {
            message.success('logout success!');
          }
        }}
        selectedKeys={[]}
        mode="horizontal"
        className="user_info"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />
        </Menu.Item>
        <SubMenu
          title={
            <span>
              <Icon type="user" />
              guest
            </span>
          }
        >
          <Menu.Item key="logout">
            <Icon type="logout" />
            退出
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

MyHeader.propTypes = {
  toggle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};

export default MyHeader;
