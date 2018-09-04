/**
 * @name: mongoose
 * @description: 数据库管理
 * create by NHF 2018-06-14
 */

import mongoose from 'mongoose';
import config from '../config/config';
import chalk from 'chalk';

// 链接 mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.url);
mongoose.set('debug', true);

const db = mongoose.connection;

// 连接成功
db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  );
});

// 连接失败
db.on('error', function (error) {
  console.error(
    chalk.bold.red('Error in MongoDb connection: ' + error)
  );
  mongoose.disconnect();
});

// 断开数据库
db.on('close', function () {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  );
  mongoose.connect(config.url, {
    server: {
      auto_reconnect: true
    }
  });
});

export default db;
