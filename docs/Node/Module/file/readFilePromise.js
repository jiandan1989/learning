const fs = require("fs");

export default function readFileByPromise(url, opts) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, opts, (err, data) => {
      // 当出现读取错误时, 直接 reject
      if (err) return reject(err);
      return resolve(data);
    });
  });
}
