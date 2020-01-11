const fs = require("fs");
const data = fs.readFileSync("input.txt");
// 同样的当不指定字符编码时, 默认返回的是 buffer
console.log("同步读取: " + data.toString());

// 需要注意的是, 当同步读取失败时, 需要使用 try catch 进行捕获
try {
  const data = fs.readFileSync("input.txt");
} catch (error) {
  console.log(err);
}
