const chalk = require('chalk');
const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const home = new KoaRouter();

// 子路由1
home.get('/', async (ctx) => {
  const html = `
    <ul>
      <li>
        <a href="/page/helloworld">/page/helloworld</a>
      </li>
      <li>
        <a href="/page/404">/page/404</a>
      </li>
      <li>
        <a href="/users">users</a>
      </li>
    </ul>
  `;
  ctx.body = html;
});

// 子路由2
const page = new KoaRouter();

page.get('/404', async (ctx) => {
  ctx.body = '404 Page';
}).get('/helloworld', async (ctx) => {
  ctx.body = 'Hello World Page';
});

const users = new KoaRouter();

users.get('/', async (ctx, next) => {
  const html = `<ul>
      ${Array(10).fill(1).map((id, index) => (
        `<li>
          <a href=/users/user${index + 1}>${index + 1}</a>
        </li>`
      )).join('')}
    </ul>`
  ctx.body = html;
});

users.get('/:id', async (ctx, next) => {
  const template = `
    <div>
      <h3>url: ${ctx.request.url}</h3>
      <p>params: ${JSON.stringify(ctx.params, null, 2)}</p>
      <p>
        <span>JSON: </span>
        <pre>${JSON.stringify(ctx, null, 2)}</pre>
      </p>
    </div>
  `
  ctx.body = template;
});


// 装载所有子路由
const router = new KoaRouter();

router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log(chalk.blue('app is starting on http://localhost:3000'));
});
