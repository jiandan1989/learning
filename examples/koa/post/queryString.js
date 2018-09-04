// 解析上下文 node 原生请求的 POST参数

const parsePostData = ctx => new Promise((resolve, reject) => {
  try {
    let postData = '';
    ctx.req.addListener('data', (data) => {
      postData += data;
    });

    ctx.req.addListener('end', function () {
      let parseData = parseQueryStr(postData);
      resolve(parseData);
    })
  } catch (error) {
    reject(error);
  }
});

// 将 POST 请求参数字符串解析为 JSON

const parseQueryStr = (queryStr) => {
  let queryData = {};
  let queryStrList = queryStr.split('&');
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
};
