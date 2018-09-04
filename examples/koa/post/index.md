原生 koa 没有封装获取参数的方法, 通过解析上下文 context 中的原生 node.js 请求对象 req, 将 POST 表单数据解析成 querystring
