/**
 * @name: 面包屑导航
 * @TODO: pathname 动态
 */

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Breadcrumb } from 'antd';

function BreadcrumbComponent({ location }) {
  const pathArr = location.pathname.replace('/', '').split('/');
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/">Home</NavLink>
      </Breadcrumb.Item>
      {pathArr.length > 0 &&
        pathArr.map(key => {
          return (
            <Breadcrumb.Item key={key}>
              {pathArr.length - 1 === key ? (
                <NavLink to={`/${key}`}>{key}</NavLink>
              ) : (
                key
              )}
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
}

export default withRouter(connect()(BreadcrumbComponent));
