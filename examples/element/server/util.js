/**
 * @name getIp
 * @description: 获取本机Ip
 */

import os from 'os';

export const networkinterfaces = os.networkInterfaces();

export const getIp = networkinterfaces.en0.find(item => item.family === 'IPv4').address;
