import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
// import createHistory from "history/createBrowserHistory";
// import { ConnectedRouter, routerMiddleware, push } from "react-router-redux";
import { createStore } from 'redux';
// import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
import asyncComponent from './utils/asyncComponent';

import LayoutWrapper from './components/layout';
import FormComponent from './views/components/form';

// const history = createHistory();
// const middleware = routerMiddleware(history);
const store = createStore(reducers, {});

// const store = createStore(reducers, applyMiddleware(middleware));
/** */

const routePath = [
  '/Login',
  '/Dashboard',
  '/UserList',
  '/PostList',
  '/Echarts',
  '/Echarts/Line',
  '/HighCharts',
  '/Editor',
  '/components/forms',
];

const routes = [
  ...routePath.map(path => ({
    path,
    component: asyncComponent(() => import(`./views${path}`)),
  })),
  {
    path: '/notFound',
    component: asyncComponent(() => import('./views/NotFound')),
  },
];

// @TODO 子集路由
// const renderRoutes = routesData =>
//   routesData.map(item => {
//     if (Array.isArray(item.routes)) {
//       return renderRoutes(item.routes);
//     }
//     return (
//       <Route
//         exact
//         key={item.path}
//         path={item.path}
//         component={item.component}
//       />
//     );
//   });

// @todo getUserConfirmation
//  basename="/"
const RoutesConfig = (
  <Provider store={store}>
    <Router>
      <LayoutWrapper>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/Dashboard" />} />
          {routes.map(({ path, component }) => (
            <Route exact key={path} path={path} component={component} />
          ))}
          <Route exact path="/componets/forms" component={FormComponent} />
          <Redirect from="*" to="/notFound" />
        </Switch>
      </LayoutWrapper>
    </Router>
  </Provider>
);
export default RoutesConfig;
