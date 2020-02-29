# webpack 零配置 {docsify-ignore}

> 默认在 `V4.0`版本后, 可以引入一个零配置的文件来配置你的项目, 当然也可以高度可配置性, 这里只是测试零配置如何进行项目构建, 不单单只安装 `webapack` 也需要安装 `webpack-cli`, 更多的安装使用配置需要查看 `NPM`的使用(TODO), 不同命令安装方式最后打包的结果不一致, 比如添加 `-D`

```bash
mkdir webpack-demos/demo1
cd demo1
yarn init -y
yarn add webpack webpack-cli -D

touch index.html
mkdir src
touch index.js
```

**为了方便测试:**`index.html` 引入打包后的地址 `./dist/main.js`(默认打包产出的路径为 `dist`), 随意的在 `index.js` 中添加些代码, 直接写入 `console.log('Hello World')` 然后执行 `npx webpack` 之后会发现在 `demo1`目录下生成一个 `dist`文件夹及包含有 `main.js`文件, 此时打开浏览器访问 `index.html`然后就可以看到刚才打印的 `Hello World`

> 但是这种方式需要是简便, 可以发现打包生成后的文件及执行命令时的`waning`提示, 表明没有指定的 `mode`(模式: 默认就使用了`production`已经压缩过后的并不是很利于调试我们的代码, 在此疑惑之前呢, 需要对于加载文件的方式进行部分了解, 及如何在 `webpack`打包时引入文件, 创建一个 `a.js` 使用 `module.exports` 导出一个简单的模块, 比如 `module.exports = 'Hello World'`, 然后在 `index.js` 中进行加载使用

```js
const str = require("./a"); // 加载文件时, 如若是 .js 后缀不需要添加后缀名称
console.log(str);
```

> 修改完成之后, 再次执行 `npx webpack`, 并再次访问 `index.html`之后, 看到依旧是可以执行的, 这就说明 `webpack`帮助我们完成了在浏览器中无法使用的模块加载的打包编译

以上是对于零配置的项目进行使用,但是呢 我们需要更多的配置来管理我们的项目, 比如在不同模式的打包情况下使用不同的处理方式, 以及打包配置可以生成多个输入文件及对路径的修改, 接下来就需要了解下基础的概念

---

## 打包基础配置

> 首先创建一个 `webpack.config.js` 文件, 为什么是 `webpack.config.js`呢, 这在打包的 `webpack-cli`中的读取文件设定, 只允许有 `webpack.config.js` 和 `webpackFile.js` 两个文件会进行读取, 然后我们需要对[入口 (entry)](https://webpack.js.org/concepts/entry-points/)文件进行配置

**webpack.config.js**

```js
module.exports = {
  entry: "./src/index.js", // 默认使用的
  entry: {
    // 对象形式, 可以打包出多个 bundle 的 chunk 文件
    main: "./src/index.js",
    demo: "./src/demo.js"
  }
};
```

接下来就尝试一下对象形式进行打包, 创建一个 `demo.js` 文件, 这里我们并不是为了展示代码, 只是进行测试打包产出的文件, 代码随意添加就行, 然后执行 `npx webpack --mode=production`(这里还未设置的模式的指定,先使用命令行参数进行打包), 打包成功之后就可以看到在 `dist`文件夹下出现两个 文件 `main.js` 和 `demo.js`

### 入口

> 默认为 `./src/index.js` 文件, 但我们可以通过配置(`entry`)来设定多个入口文件, 支持的形式有多种, 包含有`字符串形式`(单一的入口文件, 指定路径)

> 以上提到了在执行命令 `npx webpack` 之后提示了 `warning`信息, 没有指定 `mode`造成的, 现在就先了解一下打包编译后生成文件的几种`mode`,如果不使用配置文件时, 可以使用 `npx webpack --mode=production` 设置打包模式, 当我们有更多的文件需要打包时, 且文件的路径都是一直的, 可以使用 `context`配置基础的执行目录 `context: path.resolve(__dirname, 'src')`, 然后在entry 中就可以只引入文件名称就可以了

### 出口

> 有入口必然有时需要指定出口文件的路径及文件名称, 这里就需要进行 [出口 (output)](https://webpack.js.org/concepts/output/)配置, 最基础的就必须要有 [filename](https://webpack.docschina.org/configuration/output/#output-filename) 属性, 可以通过 `hash` `chunkhash` 等多种方式进行打包

- production: 生产模式, 将会默认设置 `DefinePlugin`中的 `process.env.NODE_DEV`变量设置为 `production`
- development: 开发模式, 同上, 但是会将变量设置为 `development`

**webpack.config.js**

```js
module.exports = {
  mode: "production" // 或者 development none
};
```
