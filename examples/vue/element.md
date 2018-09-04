# ElementUI 引入

### 安装

```vim
npm i element-ui -S
```

### 完整引入

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 按需加载

> 安装插件: [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)

> `npm install babel-plugin-component babel-preset-es2015 -D`

### 修改 `.babelrc`

```vim
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

### 引入

```javascript
// 修改 main.js

import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

> 注意 `MessageBox, alert, confirm, Notification, Message` 注入到 `Vue.prototype`中

```javascript
Vue.use(Loading.directive); // 加载loading 指令
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// Loading

v-loading="loading"; // 指令

// Message
this.$message.success(options);

// MessageBox
this.$alert(message, title, options) 或 $alert(message, options);

this.$confirm(message, title, options) 或 $confirm(message, options);

this.$prompt(message, title, options) 或 $prompt(message, options);

// Notification
this.$notify(ops);
```
