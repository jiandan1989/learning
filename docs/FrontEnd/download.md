## 前端上传下载 {docsify-ignore}

### 下载

> 在开始之前呢, 需要知道下载的几种方式

- 通过 `a`标签进行下载, 众所周知在`a`标签有一个 `download`属性, 通过此属性可以对文件进行下载, 但是是属于 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5), 兼容性有待考察, 在主流浏览器中是可以使用, 但不包含有`IE`系列, 需要结合 `URL.createObjectURL` 和 `URL.revokeObjectURL` 方法, [可参考](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications#Example.3a_Using_object_URLs_to_display_images)
- 通过 location.href 或者 window.open 方法进行下载, 但只能下载那些浏览器不支持预览的文件, 比如图片, 最后可能还是需要使用 `a`标签来做兼容处理, 但可以通过设置返回数据字段为文件流`'Content-Type': 'application/octet-stream'`, 或者是将文件转换为 `zip`压缩文件, 浏览器是无法直接访问到 `zip` 文件的,就会直接进行下载, 问题就是需要后台配合使用`@todo`

### 上传

#### 预览

> 通过使用 `URL.createObjectURL` 或者使用 [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 结合 `readAsDataURL` 读取图片转换为 `base64`

### 参考

- [how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server](https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server)

<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL -->
<!-- https://alligator.io/nodejs/how-to-use__dirname/ -->
<!-- https://segmentfault.com/a/1190000002786372 查看原图 -->
<!-- https://codeburst.io/react-image-upload-with-kittens-cc96430eaece -->
<!-- https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa -->
<!-- https://segmentfault.com/a/1190000015430643 -->
<!-- https://juejin.im/post/5c3c4b3551882524a5420119#heading-6 -->
<!-- https://segmentfault.com/a/1190000019359452 -->
<!-- https://juejin.im/post/5a0545a75188254d2b6d979c -->
<!-- https://juejin.im/post/5bd5547a6fb9a05cdd2d5109 -->
<!-- https://juejin.im/entry/5779d2e60a2b5839375ac162 -->
<!-- https://medium.com/@jmperezperez/how-medium-does-progressive-image-loading-fd1e4dc1ee3d -->


<!-- https://towardsdatascience.com/the-most-in-demand-tech-skills-for-data-scientists-d716d10c191d -->
<!-- https://towardsdatascience.com/sorry-projects-dont-get-you-jobs-3e5d8e74bfdc -->
<!-- https://towardsdatascience.com/the-most-powerful-idea-in-data-science-78b9cd451e72 -->
<!-- https://medium.com/free-code-camp/learning-python-from-zero-to-hero-120ea540b567 -->
<!-- https://morioh.com/p/973715d48f61 -->
<!-- https://subscription.packtpub.com/book/web_development/9781788835534 -->
<!-- https://learnstartup.net/p/AvC-hgyXv/javascript-jquery-react -->
<!-- https://websitesetup.org/ -->
<!-- file:///Users/niexiaofei/2016/web/Web%E7%A8%8B%E5%BA%8F%E5%91%98%E5%BF%85%E5%A4%87%E7%9A%8443%E6%AC%BE%E5%8F%AF%E8%A7%86%E5%8C%96%E5%BC%80%E5%8F%91%E8%AE%BE%E8%AE%A1%E5%B7%A5%E5%85%B7_%E7%BD%91%E7%AB%99%E6%8E%A8%E8%8D%90_%E8%A5%BF%E9%83%A8e%E7%BD%91.html -->

<!-- https://github.com/yangshun/front-end-interview-handbook -->

<!-- https://yq.aliyun.com/articles/487942 可视化 -->
<!-- https://magi.com/search?q=D3 -->
<!-- https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE -->
<!-- https://bost.ocks.org/mike/ -->
