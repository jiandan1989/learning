### 分包加载

> 通过在 `app.json` 中设置 `subPackages: []`, 这个分包总体不大于`4M`, 单个分包不大于`2M`

```json
"subPackages": [{
  "root": "page/xxx",
  "pages": ["xxx/xxx"]
}]
```

### 自定义组件

> 自定义组件使用 `slot`(插槽): 通过使用 `$slots.slotName` 判断是否需要显示

```html
<view class="wrapper">
  <view class="header" a:if="{{$slots.header}}">
    <slot name="header" />
  </view>
</view>
```
