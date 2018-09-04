/**
 * @name: app
 * @description: app 中间件处理
 */

import Koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';

export const app = new Koa();

// 错误处理
app.on('error', function (err) {
  console.error(chalk.red(err.stack));
  log(chalk.red(err.message));
});

app.use(bodyParser());

export default koaRouter;
