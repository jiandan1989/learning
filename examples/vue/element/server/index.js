/**
 * @name: app
 * create by NHF 2018-06-14
 * @description: 启动入口
 */

import chalk from 'chalk';
import router from './routers'; // router
import { app } from './app';

import { getIp } from './util';
import config from './config/config'; // 默认端口号

router(app);

app.listen(config.port, () => {
  console.log(chalk.blue('The server is starting'));
  console.log(chalk.blue(`
    Local: http://localhost:${config.port}
    IP: http://${getIp}:${config.port}
    `));
});
