# 文件读取 {docsify-ignore}

#### 简介

> 在 `NodeJS` 中提供一个内置模块, 可以访问到本地文件,并且可以对文件进行读写操作, 并且在`Javascript` 中提供`同步`和`异步`的方式进行操作. 因为 `Javascript` 是属于单线程, 至于异步操作呢 在操作 IO 时不需要等待, 而是传入回调函数, 继续执行后续的代码, 等到有结果返回时再执行定义的回调函数, 而同步操作则是在执行时必须等到当前代码执行完毕后才能执行后续的代码, 缺点就是在等待时间内, 无法进行其他的操作

### 读取文件

使用异步`fs.readFile(path[, options], callback)` 和 同步`fs.readFileSync(path[, options])`, 两个方法的基础参数 `path` 和 `options`是一样的

- `path`: 可以接收为 `string`, `Buffer`, `url` 文件名或文件描述符
- `options`: 可以是对象(`Object`) 也可以是 `String`, 默认为 `null`
  - `encoding`: `string | null` 默认为 `null`
  - `flag`: `string` 默认为 `r`

**不同的是**
同步读取接收第三个参数 `callback`, 接收两个参数 `err(Error)` 和 `data(string | Buffer)`是文件的内容, 如果没有指定 `encoding` 则返回原始的 `buffer`, 如果 `options` 是字符串, 表示指定字符编码

### 基础读取

**异步**

[](file/readFile.js ' :include :type=code')

**同步**

[](file/readFileSync.js ' :include :type=code')


> 但是在通常情况下我们在读取完成之后, 可能会对文件内容进行修改然后再次的进行写入文件, 当操作过多时就会形成了一个嵌套地域, 为了避免此类情况, 可以尝试使用 [`[Promise]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

**Promise版本**

[](file/readFilePromise.js ' :include :type=code')

<!-- **async await 版本**

[](file/readFileAsync.js ' :include :type=code') -->


### 其他

- [node-xlsx](https://www.npmjs.com/package/node-xlsx): 读取Excel 文件
