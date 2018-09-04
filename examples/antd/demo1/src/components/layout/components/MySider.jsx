/**
 * @name: MySidebar
 * @desc: 侧边栏
 */

// eslint-disable
import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import SIDEBAR from '../../../constants/sidebar';

const { Sider } = Layout;
const { SubMenu } = Menu;

const MenuTitle = ({ icon, text }) => (
  <span>
    <Icon type={icon} />
    <span>{text}</span>
  </span>
);

const loopMenu = data =>
  data.map(({ icon, key, text, children }) => {
    if (Array.isArray(children)) {
      return (
        <SubMenu key={text} title={<MenuTitle {...{ icon, text }} />}>
          {loopMenu(children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={text}>
        <NavLink
          exact
          activeStyle={{ color: 'red', fontWeight: 'bold' }}
          to={key}
        >
          <Icon type={icon} />
          {text}
        </NavLink>
      </Menu.Item>
    );
  });

const MySider = ({ location, collapsed }) => {
  return (
    <Sider
      className="sider_warpper"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        selectedKeys={location.pathname.substr(1).split('/')}
        className="sider_menu"
        theme="dark"
        mode="inline"
      >
        {loopMenu(SIDEBAR)}
      </Menu>
      {/* <div className="switch_theme">
        <span>
          <Icon type="bulb" />&nbsp;Switch Theme
        </span>
        &nbsp;
        <Switch
          defaultChecked
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div> */}
    </Sider>
  );
};
MySider.propTypes = {
  collapsed: PropTypes.bool.isRequired
};
export default MySider;
