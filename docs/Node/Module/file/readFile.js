const fs = require('fs');
fs.readFile('input.txt', function(err, data) {
  if (err) return console.log(err);
  // 此处因为没有指定编码, 返回的是 buffer, 使用data.toString()装换为 string
  console.log('异步读取' + data.toString());
});
