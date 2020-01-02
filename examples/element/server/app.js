/**
 * @name: app
 * @description: app 中间件处理
 */

import Koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';


export const app = new Koa();

// 错误处理
app.on('error', (err) => {
  console.error(chalk.red(err.stack));
  console.log(chalk.red(err.message));
});

app.use(bodyParser());

export default koaRouter;
