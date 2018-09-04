const chalk = require('chalk');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello koa2';
});

app.listen(3000);

console.log(chalk.blue('[demo1] start-quick is starting at port 3000'));
