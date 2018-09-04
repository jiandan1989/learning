const Koa = require('koa');
const app = new Koa();
const chalk = require('chalk');

app.use(async (ctx) => {
  const url = ctx.url;

  // 上下文 request 中获取

  const request = ctx.request;
  const req_query = request.query;
  const req_querystring = request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }

})

app.listen(3000, () => {
  console.log(chalk.blue('app is starting on http://localhost:3000'));
});
