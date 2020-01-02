### 准备

- 下载 [开发工具](https://opendocs.alipay.com/mini/ide/download)
- 查看 [开发文档](https://opendocs.alipay.com/mini/developer/getting-started)
- 登录 小程序后台,创建应用(测试)

> 下载好开发工具之后, 点击创建使用模板 `ToDoList`

### 组件

**扩展组件**

```bash
# 安装组件库
npm install mini-antui --save
```

- 在`.json`中使用

```json
{
  "usingComponents": {
    "card": "mini-antui/es/card/index"
  }
}
```

- 在`axml`文件中使用

```html
<card
  thumb="{{thumb}}"
  title="卡片标题2"
  subTitle="副标题非必填2"
  onClick="onCardClick"
  info="点击了第二个card"
/>
```

### 注意点

- 模板中只能允许有一个节点, 这个和 [Vue](https://vuejs.org/) 有点像
- 在引用时, 只会引用目标文件中的模板, 不会引用模板的模板, 如 A,B,C 三个模板, B 引用 A, 在 C 中引用 B 不会将 A 引入

### 参考

- [蚂蚁金服开放平台](https://open.alipay.com/platform/home.htm)
- [简书-支付宝小程序开发体验](https://www.jianshu.com/p/1c3d7567c156)
