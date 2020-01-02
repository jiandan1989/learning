#### 使用 wepy 搭建微信小程序 {docsify-ignore}

```bash
npm install wepy-cli -g
wepy Demo                       # 创建
npm install                     # 安装
wepy build --watch --no-cache   # 启动
# 预览 打开微信小程序, 导入 dist 文件夹, 只用于预览, 开发使用 vscode
# 引入第三方组件库, 拷贝 node_modules 下 vant 文件到 components
npm i vant-weapp -S --production
# app.wpy
usingComponents: {
  'van-button': 'components/vant/button/index',
  'van-field': 'components/vant/field/index',
},
```

### 常见问题

- [slot 不生效](https://github.com/Tencent/wepy/issues/115): 自定义组件使用 slot 在.wpy 中不生效, 在使用时,必须要声明于子组件中, 否则不会编译

```ts
// 省略
import ScrollWrapper from "./ScrollWrapper";
{
  components = {
    "scroll-wrapper": ScrollWrapper
  };
}
```
