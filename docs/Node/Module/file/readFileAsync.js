const fs = require("fs");

export default async function readFileByPromise(url, opts) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, opts, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}
