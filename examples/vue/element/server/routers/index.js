/**
 * @name: routers
 * @description: 路由设计
 * create by NHF 2018-06-14
 */

import userRouter from './userRouter';

export default (app) => {
  app.use(userRouter.routes()).use(userRouter.allowedMethods());
};
