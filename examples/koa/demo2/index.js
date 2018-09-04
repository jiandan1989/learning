const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();


/**
 * 使用 Promise 封装异步读取文件方法
 * @param: { string } page html 文件名
 * @return { promise }
 */

const render = (page) => {
  return new Promise((resolve, reject) => {
    const viewUlr = `${path.join(__dirname, '/views/')}${page}`;
    console.log(viewUlr);
    fs.readFile(viewUlr, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
}

/**
 * 根据 URL 获取 html 内容
 * @param: { string } koa 上下文的 URL, cxt.url
 * @return: { string} 读取的HTML内容
 */

const route = async (url) => {
  let view = '404.html';
  switch (url) {
    case '/':
      view = 'index.html';
      break;
    case '/index':
      view = 'index.html';
      break;
    case '/404':
      view = '404.html';
      break;
    default:
      view = 'index.html';
      break;
  }
  const html = await render(view);
  return html;
}
app.use(async (cxt) => {
  const url = cxt.request.url;
  const html = await route(url);
  cxt.body = html;

});

app.listen(3000);

console.log(chalk.blue('[demo1] start-quick is starting at port 3000'));
