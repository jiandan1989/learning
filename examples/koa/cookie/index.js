const Koa = require('koa');
const chalk = require('chalk');
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('cid', 'hello world', {
      domain: 'localhost', // 所在的域名
      path: '/index', // 路径
      maxAge: 10 * 60 * 1000, // 有效时长
      epires: new Date('2017-02-15'), // 失效时间
      httpOnly: false, // 是否只用于 http 请求中获取
      overwrite: false, // 是否允许重写
    });
    const a = ctx.cookies.get('cid');
    // ctx.body = a;
    ctx.body = `${a} cookie is ok`;
  } else {
    ctx.body = 'hello world';
  }
});

app.listen(3000, () => {
  console.log(chalk.blue('http://localhost:3000'));
});
