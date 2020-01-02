## 微信小程序 {docsify-ignore}

### 请求

- `wx.showloading` 和 `wx.showToast` 只能显示一个
- 除了使用 `wx.showLoading / hideLoading`, `showToast / hideToast` 还可使用 w`x.showNavigationBarLoading / wx.hideNavigationBarloading`(在导航栏中显示 loading)

```js
const WxRequest = options => {
  wx.showLoading({
    // 添加自定义 loading
    title: "加载中..."
  });
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      success(res) {
        wx.hideLoading();
        // todo 此处需要统一做判断
        if (res.statusCode === 200) {
          return resolve(res);
        }
        // todo 其他错误码判断
        if (res.statusCode === 401) {
          wx.showModal({
            title: "温馨提示",
            content: "无权限, 请联系管理员或返回首页重新登录",
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: "/pages/login/index"
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }
      },
      fail() {
        wx.hideLoading();
        return reject();
      }
    });
  });
};
```

### 参考文档

- [wepy](https://tencent.github.io/wepy/)
- [awesome-wepy](https://github.com/aben1188/awesome-wepy)
- [weweb](https://github.com/wdfe/weweb)
