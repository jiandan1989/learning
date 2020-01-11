## 简介 {docsify-ignore}

## Typescript 环境

> 这里不考虑是使用 koa 或者 express, 只考虑搭建 TS 环境

```bash
tsc init # 在根目录下执行, 生成 tsconfig.json 文件
```

### ts-node

使用 [ts-node](https://github.com/TypeStrong/ts-node)

```bash
npm install --save @types/node
npm install --save-dev typescript
npm install --save-dev ts-node
```

> 无需手动重启, 自动刷新, 有多种方式 常规的执行`node`程序的 [nodemon](https://nodemon.io/) 以及结合 `ts-node` 的 [ts-node-dev](https://github.com/whitecolor/ts-node-dev)

**nodemon**

```bash
yarn add nodemon --save-dev
```

修改`package.json`

```json
"script": {
  "start": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts",
}
```

### ts-node-dev

使用 [ts-node-dev](https://github.com/whitecolor/ts-node-dev)

```bash
yarn add ts-node-dev --save-dev
```

修改`package.json`

```json
"script": {
  "start": "npx ts-node-dev src/index.ts",
}
```

## 常见问题

### 无法使用 require

[cannot find name ' require'](https://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require)

```ts
declare var require: any;
```

`2.x版本`

```bash
npm install @types/node --save-dev
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```
