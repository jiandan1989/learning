## 一文看懂 axios {docsify-ignore}

### 前言

> 在实际的开发过程中, 一定会用到请求层的处理, 而每一个请求方法的工具包使用方法不一, 但大致方法都是类似的. 而大多情况下都是基本会按照官网推荐方法或者 API 使用, 但很多并不能理解到工具包本身的设计原理以及思想. 不能一直停留在只是简单会用的基础上, 需要对其进行剖析, 或许理解的并不是那么深刻, 还是能够做到一个查漏补缺的效果的, 在查看了部分关于 axios 的文章后, 总觉得很多都是讲解和 源码中注释类似的翻译一样, 有人说 这种东西只可意会不可言传, 或许别人在分析时对其已经有了很深的理解, 认为大部分人可以根据一个不起眼的关键词就可以联想到一大片的逻辑原理, 但事实并不是这样的, 写一篇文章就要通俗易懂, 哪怕是解释清楚一个点, 对于自己或者别人理解使用工具的时候也有帮助.

> 鉴于以上描述, 决定自己根据别人剖析的文章内容结合源码中注释一点一滴的来学习别人是如何设计一个工具包以及如何做好性能最好, 支持度最高以及兼容性最好的一个封装工具. 仅此以鞭策学习, 并非真正的技术阅读分享, 阅读时需要谨慎!

### 简介

> `axios` 作为一个可用于浏览器端 和 `node`服务端的一个请求工具, 在 [Github](https://github.com/axios/axios) 目前已经接近 `70k`, 可以说是相当的受欢迎, 而受欢迎的地方在于

- 兼容性比较好, 可以兼容到 `IE8`
- 同时支持 客户端 和 node 端
- 支持请求拦截及其他设置
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)API, 直接链式调用
- 取消请求, 并发请求
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

> 单单从目录文件 以及简单的查看文件内容中已经可以看出使用到什么, 已经对什么进行支持

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

### 工具层

> 简单查看下导出内容尅看出来, 主要是对数据或者格式(包含[基础类型 以及 引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures))进行判断以及合并对象等操作, 此处可能需要重新了解下 `toString` / `call` / `typeof` 等相关操作的用法, 以下内容对于`大牛级别`的你可以忽略查看, 原本整个内容并非为了大牛级别阅读, 单纯就是为了重温笔记!

- 对于基础类型的判断, 包含 `undefined` `number` `string`等类型的判断, 因为基础类型可以直接使用 `typeof` 进行判断,所以不需要使用到 `toString` 方法

- 而对于引用类型, 使用 `typeof` 进行检测时全部都为 `object`, 所以无法进行进一步的判断到底是 `Array` 或者 `Date` 等其他的类型, 所以需要使用 `toString` 方法

[](https://github.com/axios/axios/blob/master/lib/utils.js ' :include :type=code')

### 模式层

### 核心层

### 参考

- [axios Github](https://github.com/axios/axios)
