## 一文看懂 axios {docsify-ignore}

### 前言

> 在实际的开发过程中, 一定会用到请求层的处理, 而每一个请求方法的工具包使用方法不一, 但大致方法都是类似的. 而大多情况下都是基本会按照官网推荐方法或者 API 使用, 但很多并不能理解到工具包本身的设计原理以及思想. 不能一直停留在只是简单会用的基础上, 需要对其进行剖析, 或许理解的并不是那么深刻, 还是能够做到一个查漏补缺的效果的, 在查看了部分关于 axios 的文章后, 总觉得很多都是讲解和 源码中注释类似的翻译一样, 有人说 这种东西只可意会不可言传, 或许别人在分析时对其已经有了很深的理解, 认为大部分人可以根据一个不起眼的关键词就可以联想到一大片的逻辑原理, 但事实并不是这样的, 写一篇文章就要通俗易懂, 哪怕是解释清楚一个点, 对于自己或者别人理解使用工具的时候也有帮助.

> 鉴于以上描述, 决定自己根据别人剖析的文章内容结合源码中注释一点一滴的来学习别人是如何设计一个工具包以及如何做好性能最好, 支持度最高以及兼容性最好的一个封装工具. 仅此以鞭策学习, 并非真正的技术阅读分享, 阅读时需要谨慎!

### 简介

> `axios` 作为一个可用于浏览器端 和 `node`服务端的一个请求工具, 在 [Github](https://github.com/axios/axios) 目前已经接近 `70k`, 可以说是相当的受欢迎, 而受欢迎的地方在于

- 兼容性比较好, 可以兼容到 `IE8`
- [同时支持 客户端 和 node 端](#adapter): 这里对环境进行判断决定加载客户端或者服务端的请求方法
- [请求和响应拦截处理](#InterceptorManager)
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [取消请求, 并发请求](#cancel)
- 转换请求及响应数据
- 自动转换 `JSON`数据
- 客户端支持防止 [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

### 目录结构

```
.
├── bower.json
├── dist                              # 打包生成文件, 可以忽略
├── examples                          # 示例代码文件, 可以忽略
├── index.d.ts                        # TS 声明文件
├── index.js                          # 打包入口文件
├── karma.conf.js                     # 浏览器中测试运行器 配置文件
├── lib
│   ├── adapters                      # 适配器
│   │   ├── http.js                   # http 适配器
│   │   └── xhr.js                    # 客户端 xhr 适配
│   ├── axios.js                      # axios 导出文件 及绑定所有的 核心方法
│   ├── cancel
│   │   ├── Cancel.js                 # 取消请求
│   │   ├── CancelToken.js            # 取消 token 设置
│   │   └── isCancel.js               # 判断是否已经取消
│   ├── core                          # 核心代码文件目录
│   │   ├── Axios.js                  # Axios 构造函数
│   │   ├── InterceptorManager.js     # 拦截器设置
│   │   ├── buildFullPath.js          # 构造URL全部路径
│   │   ├── createError.js            # 错误拦截捕获
│   │   ├── dispatchRequest.js        # 触发 Request 请求
│   │   ├── enhanceError.js           # 错误处理
│   │   ├── mergeConfig.js            # 请求前配置处理
│   │   ├── settle.js                 # 根据 Response 返回进行简单校验
│   │   └── transformData.js          # 对 request 或 response 进行数据转换
│   ├── defaults.js                   # 设置导出默认配置项
│   ├── helpers                       # 浏览器 polyfill / 管理 cookie / 解析 HTTP headers
│   │   ├── bind.js                   # 实现 bind
│   │   ├── buildURL.js               # 构建一个解析 params 后的URL
│   │   ├── combineURLs.js            # 结合 / 合并 URL
│   │   ├── cookies.js                # cookie 操作
│   │   ├── deprecatedMethod.js       # 不推荐使用 或 已弃用的请求方法
│   │   ├── isAbsoluteURL.js          # 绝对路径校验方法
│   │   ├── isURLSameOrigin.js        # 校验是否为同域
│   │   ├── isValidXss.js             # 判断是否为 Xss 代码
│   │   ├── normalizeHeaderName.js    # 对 header 名称进行统一处理
│   │   ├── parseHeaders.js           # 解析header
│   │   └── spread.js                 # 使用 apply 方法用例, 用于调用函数扩展数组的语法糖
│   └── utils.js                      # 工具类文件
├── package.json
└── webpack.config.js                 # webpack 配置文件
```

> 首先单单从目录文件看出大致可能需要了解的部分知识如下

- [TS](https://www.typescriptlang.org/): JS 超集, 支持所有的 JS 语法以及进行补充, 可以使用目前几乎所有的 ES6, 7, 8, 9 甚至是 10 的方法
- [karma](https://karma-runner.github.io/latest/index.html): 无需大量配置就可以使用的一个高效的测试运行环境
- [适配器模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/adapter.html): 需要了解设计模式的重要性
- [原生 bind 的实现](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind): 需要了解到 apply, call 和 bind 相互之间的关系以及区别, 以及如何手动实现一个 `bind`的编写
- [Webpack](https://webpack.docschina.org/configuration/output/#output-library): 如何使用 `output`对包处理输入方式及对外暴露引入的方法
- [web authetication](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API): 了解 `jwt(json web token)`跨域认证解决方案
- [XSS 攻击](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting): 了解哪些代码会造成或容易产生`XSS`漏洞攻击
- [cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie): 需要了解 `cookie` [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) [sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 以及服务端 [Session](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/sessions/Session) 之间的关系和区别, 以及在什么情况下使用哪种方式来存储
- [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP): 了解 `HTTP`中的各种`状态码` 以及 响应状态的区分, 请求方法的设置, header 的设置 以及响应数据的处理
- [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions): 了解如何使用正则表达式匹配`URL`以及对数据进行处理替换的逻辑
- [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest): 了解原生的 `XHR(XMLHttpRequest)` 对象的使用, 以及 原生 [AJAX(Asynchronous JavaScript + XML)](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)的实现
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON): 对响应返回数据的 `json` 处理方案

<!-- - [](): http 中的 Header 合并以及解析 params -->
<!-- https://juejin.im/post/5e055d9ef265da33997a42cc -->

> 首先根据 `webpack.config.js`文件入口文件 `index.js` 中查看引入了 `lib/axios`文件, 然后就直接看 `lib/axios` 文件

### lib/axios

> 首先查看下最后导出的 `axios`实例的形成

```ts
function createInstance(defaultConfig) {
  // 接收传入的 defaults 默认配置对象, 后续再查看 defaults 中的内容
  // 通过 new 创建实例之后, 此时的 context 已经有了 Axios 上所有的方法

  var context = new Axios(defaultConfig);
  // 使用自己手动实现的 bind 方法进行绑定
  // 而通过 bind 方法之后, instance 也已经有了所有的 Axios 上的方法, 且把 this 指向了 context 实例
  var instance = bind(Axios.prototype.request, context);

  // 拷贝 axios 的 prototype 到实例方法上
  utils.extend(instance, Axios.prototype, context);
  // 拷贝 context 到实例方法上
  utils.extend(instance, context);
  return instance;
}

// 用于导出的实例方法
var axios = createInstance(defaults);
// 省略代码
module.exports = axios;
// 导出允许在 TS中引入
module.exports.default = axios;
```

> 以上代码中使用到了 [bind](#bind-方法实现)(来自`helpers/bind`) 和 [extend](#extend)`(来自 util文件中)` 方法

> 看到这里, 如以下代码中显示, 此时的 `axios` 上已经继承了 所有的实例方法 和 `Axios.prototype`上的所有属性和方法, 以及 `context`, 此时导出的 `axios`其实是可以使用的, 因为已经继承了 `Axios.prototype`上的方法, 然后我们就可以继续的查看下这个 `Axios.prototype`上到底有什么方法呢

#### Axios.prototype

> 提供别名进行调用, 这里其实调用了 [Axios.prototype.request](#request)方法 和 [utils.merge](#merge), 到此时虽然可以直接使用如 `axios.get axios.post axios.put`等方法别名进行调用了, 但是还并没有真正的到核心的地方, 这些方法其实只是在`this.request`的基础上调用, 还得继续看, 慢慢的就会发觉设计模式的重要性了.

```ts
utils.forEach(
  ["delete", "get", "head", "options"],
  function forEachMethodNoData(method) {
    // 循环在 Axios.prototype 上添加 delete get head options 方法
    Axios.prototype[method] = function(url, config) {
      return this.request(
        utils.merge(config || {}, {
          method: method,
          url: url
        })
      );
    };
  }
);

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  // 循环在 Axios.prototype 上添加 post put patch 方法
  Axios.prototype[method] = function(url, data, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      })
    );
  };
});
```

#### request

> 个人感觉主要的核心之一就来源于 `request`方法, 目前只先看 上半部分, 非常简单, 只是设置一些默认值和支持 `axios(url, config)`调用时的一些处理

```ts
Axios.prototype.request = function request(config) {
  // 支持 axios('example/url'[, config]) 方式调用, 首先对 config 配置项做些处理
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // 设置 method 方法, 最终默认为 get, 依次取值 config --> defaults --> 最终默认值(也可以理解为兜底)
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }

  /***************** 此处暂停 **********************/
  // 拦截器中间件钩子, 这里 todo 需要了解下为什么是一个数组, 而第二个值是一个 undefined呢, 需要看一下 dispatchRequest 触发请求实现逻辑
  var chain = [dispatchRequest, undefined];
  // 将处理过的 config 包装成 promise 对象
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
    // 根据 unshift特性, 执行完之后就会变成了
    /**
     *  [请求前成功回调, 请求前错误回调, dispatchRequest, undefined]
     */
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    /**
     * push 方法是向后添加的,所以当执行响应的拦截器之后就会变成
     * [请求前成功回调, 请求前错误回调, dispatchRequest, undefined, 响应后成功回调, 响应后错误回调]
     */
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  /**
   * 如果考虑请求前 和 响应后都包含一个拦截器的话, 此处的 chain.length 已经变成了 6
   * 使用循环依次调用, 调用顺序就会是
   * promise = promise.then(请求前成功回调, 请求前错误回调).then(dispatchRequest, undefined).then(响应成功回调, 响应失败回调);
   * 每次请求都将经过拦截器执行
   */
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  // 将最终的 promise 对象进行返回
  return promise;
};
```

看到这里会有一个疑问, 这个`this.interceptors.request` 和 `this.interceptors.response`是一个什么呢, 可以使用 数组的`foreach`方法, 对外提供的 实例`API`中可以使用 `request.use` 和 `response.use` 方法, 且又是怎么工作的呢 ?

- 在定义 `Axios`构造函数时, 初始化了拦截器 `interceptors`为一个对象, 对象包含了 `request` 和 `response`两个属性, 定义以上两个属性时通过 `new` 关键字实例化出来的两个 [InterceptorManager](#InterceptorManager) 实例对象, 对象包含了一个拦截器的处理收集数组`handlers`, 此时基本已经把请求前所有的处理都已经做完了, 然后就应该开始[触发请求](#dispatchRequest) `请点击跳转查看`了呢 ?

### InterceptorManager

```ts
"use strict";
function InterceptorManager() {
  this.handlers = [];
}

/**
 * 添加拦截器入栈
 * @param {Function} fulfilled 函数处理
 * @param {Function} rejected 函数处理
 *
 * @return {Number} 返回一个后续需要删除时的 ID
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * 删除拦截器
 * @param {Number} id 使用 use 返回的一个 ID(也就是最后添加入栈的下标)
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * 遍历所有已经注册过的拦截器
 * 此方法将会依次执行未出栈的拦截器
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
```

- `request.use` 和 `response.use`调用之后都做了什么事 ?

从以上代码中不难看出, 都继承了 `InterceptorManager`构造函数, 在初始化实例的时候每个实例上都绑定了一个属性 拦截器的数组`handlers`, 而调用 `use`方法之后其实就是在拦截器数组中添加了一个`Promise`的拦截器, 接收两个参数 `fulfilled` 和 `rejected`处理函数 分别对应 `Promise`中的 `onSuccess` 和 `onFail`的回调, 并且返回一个用于删除拦截器的`ID`

### cancel

```ts
"use strict";
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return "Cancel" + (this.message ? ": " + this.message : "");
};

// 维护一个原型属性, 由于后续判断是否已经取消请求, 比如 isCancel
Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
```

#### isCancel

> 判断请求是否已经取消

```ts
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
```

### defaults

> 这些所有的配置都会添加到创建的实例中去, 可以通过 `instance.defaults`进行获取

- 包含了 [adapter](#adapter)获取, 判断是客户端或者服务端 加载对应的适配文件, [客户端](#client)
- 包含有 [transformRequest](#transformRequest)允许在请求前对数据进行格式转换
- 校验状态[validateStatus](#validateStatus)
- 默认 [ContentType](#ContentType)

#### transformRequest

> 在触发请求前对数据进行数据格式转换, 但最后的一个函数必须返回一个 `string` 或者一个 `Buffer` / `ArrayBuffer` / `FormData` / `Stream`的实例, 且只适合用于 `PUT', 'POST', 'PATCH' 和 'DELETE` 请求方法

```ts
transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],
```

#### validateStatus

> 查看返回状态码是否成功 `boolean`

```ts
validateStatus: function validateStatus(status) {
  return status >= 200 && status < 300;
}
```

### adapter

> 在触发请求前需要判断下是在`客户端` 或者是 `服务端`进行使用, 进行处理

```ts
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    // 客户端使用 XMLHttpRequest
    adapter = require("./adapters/xhr");
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    // 服务端使用 http
    adapter = require("./adapters/http");
  }
  return adapter;
}
```

#### ContentType

```ts
utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

// 循环对 post put patch 方法添加默认 'Content-Type': 'application/x-www-form-urlencoded'
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
```

### client

- 客户端使用原生 `XMLHttpRequest` 方法实现

> 查看请求中携带的 `Content-Type`是否为`Form`表单提交形式

```ts
if (utils.isFormData(requestData)) {
  delete requestHeaders["Content-Type"];
}
```

#### HTTP 基础认证

- 利用[btoa](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa)转换为 `base64` 实现基础的 `HTTP认证方案`, 尽管是采用了 `base64` 但是可以通过使用[atob](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob)进行逆转的, 所以就是一个明文传输,并不是很安全, 其他[更多认证方案](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)

```ts
if (config.auth) {
  var username = config.auth.username || "";
  var password = config.auth.password || "";
  requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
}
```

#### 响应数据基础处理

```ts
var responseData =
  !config.responseType || config.responseType === "text"
    ? request.responseText
    : request.response;

// 响应返回数据格式, 平时只需要使用 data 和 status 就可以了
var response = {
  data: responseData,
  status: request.status,
  statusText: request.statusText,
  headers: responseHeaders,
  config: config,
  request: request
};
```

#### 携带 cookie 凭证

> 根据 [withCredentials](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)进行设置, 及配合设置 `xsrfCookieName` 和 `xsrfHeaderName`, 或者同域, 但不支持 `react-native`

```ts
if (utils.isStandardBrowserEnv()) {
  var cookies = require("./../helpers/cookies");

  // Add xsrf header
  var xsrfValue =
    (config.withCredentials || isURLSameOrigin(fullPath)) &&
    config.xsrfCookieName
      ? cookies.read(config.xsrfCookieName)
      : undefined;

  if (xsrfValue) {
    requestHeaders[config.xsrfHeaderName] = xsrfValue;
  }
}
```

#### onDownloadProgress

> 提供下载进度监听, 利用 `XMLHttpRequest`实例化的 `progress`事件处理

```ts
if (typeof config.onDownloadProgress === "function") {
  request.addEventListener("progress", config.onDownloadProgress);
}
```

#### onUploadProgress

> 监听上传事件, 但并不是所有的浏览器都支持上传事件

```ts
if (typeof config.onUploadProgress === "function" && request.upload) {
  request.upload.addEventListener("progress", config.onUploadProgress);
}
```

#### timeoutErrorMessage

> 设置超时提示信息

```ts
request.ontimeout = function handleTimeout() {
  var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
  if (config.timeoutErrorMessage) {
    timeoutErrorMessage = config.timeoutErrorMessage;
  }
  reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));

  // Clean up request
  request = null;
};
```

> 部分配置项没有显示在 `README`文档中, 需要进行尝试后才能够确定

<!-- > 综上可以大概总结下支持的内容

- 上传 / 下载进度事件
- cookie 设置
- responseType: 设置返回类型
- withCredentials: 携带令牌
- 取消请求 -->

### Node

> Node 端主要使用内置的 `Http` 和 `https`进行实现, 咱不看, 后续重新查看 `node`时再来补充 `todo`

### dispatchRequest

> 接上句, 但是在触发请求前还是需要做一些事情, 比如[适配器层处理](#adapter), 判断[是否取消请求](#cancel), 在上边最开始`lib/axios`导出文件中已经说明, 最终其实是继承了[Axios.prototype.request](#request)的实例, 而创建实例时有一个[defaults](#defaults)对象

------------ 未完待续 -------------

### 工具

> 简单查看下导出内容可看出来, 主要是对数据或者格式(包含[基础类型 以及 引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures))进行判断以及合并对象等操作, 此处可能需要重新了解下 `toString` / `call` / `typeof` 等相关操作的用法, 以下内容对于`大牛级别`的你可以忽略查看, 原本整个内容并非为了大牛级别阅读, 单纯就是为了重温笔记!

[查看源码](https://github.com/axios/axios/blob/master/lib/utils.js)

- 对于基础类型的判断, 包含 `undefined` `number` `string`等类型的判断, 因为基础类型可以直接使用 `typeof` 进行判断,所以不需要使用到 `toString` 方法
- 而对于引用类型, 使用 `typeof` 进行检测时全部都为 `object`, 所以无法进行进一步的判断到底是 `Array` 或者 `Date` 等其他的类型, 所以需要使用 `toString` 方法
- 如何两个对象进行浅合并 及 深度合并 以及 对象继承

#### merge

> 通过对代码上方的注释能够了解到, 最终的结果就是假设传递多个对象, 将会利用对象 key 值唯一性将之覆盖, 只取最后的值

```ts
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      // 这里使用了 类递归的方式将多个对象中的同一个 key 且 属性值是对象时, 将属性值对象进行合并
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

// 如果单纯只使用 merge 和 forEach 方法的话, 比如
const a = merge({ name: "name1" }, { name: "name2" });
console.log(a); // { name: 'name2' }

const b = merge({ name: { name1: "name1" } }, { name: { name2: "name2" } });
console.log(b); // { name: { name1: 'name1', name2: 'name2' } }
```

#### bind 方法实现

- 此处需要思考的是 为什么使用 `apply`实现, 而不是 `call` 以及他们之间的区别
  <!-- 可以参考[apply call bind 三者之间的区别与联系](applyCallBind.md) -->

```ts
"use strict";

// 导出手动实现 bind(并非是原生bind实现), 注意这里并没有使用到 ES6中的 Array.from 或者 [...args]的转换方法
// 单纯的使用 arguments.length
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    // 此处使用 apply 而不是 call 只是因为接受参数格式不一样而已
    return fn.apply(thisArg, args);
  };
};
```

#### extend

> 可以接收三个参数, 其实在注释上已经有标注了, 对第二个参数 `b`使用 自定义的`forEach`方法进行遍历, , 将 b 上所有的属性和方法都拷贝到 第一个参数`a`上, 如果遍历时属性值是 `function`时 使用 `bind`方法拷贝到`a`上

```ts
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      // 如果 val 是 function 就使用 bind 方法再次绑定
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  // 最终返回的 a上已经有了所有的 b上的方法, 及 thisArg的属性和方法
  // 如果原来就有的方法和属性根据对象 key值的唯一性将会被重新覆盖掉
  return a;
}
```

`TODO`

- cookie 读 / 写
- xss

### 参考

- [axios Github](https://github.com/axios/axios)
- [Axios 中文文档](https://www.kancloud.cn/yunye/axios/234845)
- [Vue 中使用 axios 访问 API](https://cn.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
- [YouTube 视频 Axios Crash Course | HTTP Library](https://www.youtube.com/watch?v=6LyagkoRWYA)

<!-- https://juejin.im/post/5b2365426fb9a00e315c18b6 -->
<!-- https://juejin.im/post/5c2e10a76fb9a049c0432697 -->
<!-- https://juejin.im/post/5cb5d9bde51d456e62545abc#heading-5 -->
