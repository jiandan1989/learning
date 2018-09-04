## Angular 学习记录

### 指令绑定

- `ng-repeat` 中动态绑定 id, `id = "{{$index}}"`,默认将 `$index`注入, `ng-init`自定义变量的值

- `ng-class="{ true: 'active' : '' }"`

- svg: xlink:href 使用报错, 使用 `xlink:href="" ng-href=""` 替代, [参考地址](https://stackoverflow.com/questions/15895483/angular-ng-href-and-svg-xlink)
