/**
 * @name: userModel
 * create by NHF 2018-06-14
 * @param:
 * 1. id: 用户ID
 * 2. create_time: 创建时间
 * 3. password: 用户密码
 * 4. username: 用户名
 * 5. avatar: 用户头像
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const user = new Schema({
  id: Number,
  create_time: String,
  password: String,
  username: String,
  avatar: {
    type: String,
    default: 'default.jpg',
  },
});

export default mongoose.model('user', user);
