## 基础知识 - Promise {docsify-ignore}

> 对于一个单线程的执行环境来说, 有些操作是比较消耗性能且对用户体验来说并不是很友好的方式, 比方说在以前的开发过程中, 通常会出现一些如鉴权的形式, 只有等鉴权方法调用结束后才能对后续的操作进行执行时, 就有可能会需要在一个称之为[回调函数](<https://en.wikipedia.org/wiki/Callback_(computer_programming)>)的方式来调用, 当然这还只是一个比较简单的, 假设读取一个文件或者目录时, 需要对[文件系统](https://nodejs.org/api/fs.html)进行调用时, 比较耗时间且后续操作无法进行, 操作的过程中需要不停的调用时, 就会出现[Callback Hell](http://callbackhell.com/), 这样就使得代码变得越来越难以维护和不可阅读

> 而为了使得这种难以维护的代码变得更加易阅读和维护, 出现了 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise), 其实个人理解的是一种状态机的存在

### 特点

- 对象的状态不受外界影响即一旦生成实例对象, 内部状态只受内部改变而改变, 外界无法修改, 有三种状态 `pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

- 一旦状态改变, 就不会再变, 任何时候都可以得到这个结果, 而改变的两种可能 `pending` --> `fulfilled` 和 `pending` --> `rejected` 要么成功, 要么失败, 不会存在第三种可能改变

### 使用

> 既然称之为异步编程方式, 状态要么是成功要么是失败, 所以就一定会有可以在成功或失败时处理的方法, 先看一个简单的基本使用方法

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("成功的状态"), 300);
});
promise.then(
  value => {
    console.log(value);
  },
  error => {
    console.log(error);
  }
);
```

> 在上述代码中已经展示了 成功回调`resolve`的方法, 这里将会在 `300ms`后返回字符串`成功的状态`, 而创建生成的 `Promise`实例对象上带有 `then`方法接收一个函数作为参数, 而函数中接收两个参数 `resolve`(成功) 和 `reject`(失败)处理的回调函数

> `Promise`对象创建后将会立即执行, 当同步操作完成后, 才会执行异步操作

- `then`: 接收函数(函数内接收两个处理函数)作为回调, 当异步操作的状态改变时调用, 而每一个`resolve`中接收到的值是指上一个 `resolve`的返回值, `reject`当异步操作失败后的回调. 这里需要注意的是 当`resolve`的返回值不是一个 `Promise`值时,将会直接调用 `Promise.resolve(value)` 创建一个 `Promise`对象进行返回
- `resolve`: 成功回调, 返回值作为下一个 `then`方法的接收值
- `reject`: 失败回调, 将状态置为 `rejected` 且可以通过 `catch`方法进行捕获

#### 常用使用场景

> 加载图片

```js
const loadImageAsync = function loadImageAsyncWithPromise(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error("Could not load image at" + url));
    };

    image.src = url;
  });
};
```

还有更多的使用场景, 比如请求后台接口数据, 读取本地文件 及 写入本地文件([NodeJS FS](https://nodejs.org/api/fs.html))等

> 而对于当前已经了解到的方法 `then` `resolve` `reject` 等可以简单的想下到底内部是如何实现的

### 参考

- [callback](https://javascript.info/callbacks)
- [ES6 入门 - Promise](https://es6.ruanyifeng.com/?search=promise&x=0&y=0#docs/promise)
- [Promise A+ 规范](https://promisesaplus.com/)
- [NodeJs - Async Hooks](https://nodejs.org/api/async_hooks.html)
