## Restful API {docsify-ignore}

> 如何使用 [Express](https://expressjs.com/)搭建一个 [Restful API](https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm)

接下来尝试创建一个电影的增删改查操作

```bash
npm init -y

npm install -S express body-parser multer

npm install -D nodemon chalk ts-node
```

> 修改 `package.json`

```json
"script": {
  "start": "nodemon --exec ./node_modules/.bin/ts-node -- index.ts",
}
```

`先查看一下我们需要实现的功能`

| 方法   | URL                 | 功能                                         |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `movies/list`       | 获取所有电影的列表                           |
| GET    | `movies/detail/:id` | 根据`ID`获取到电影详情                       |
| POST   | `movies/add`        | 根据接收的参数创建一个新的电影, 插入到列表中 |
| DELETE | `movies/delete/:id` | 根据`ID`删除电影                             |
| PUT    | `movies/modify/:id` | 修改电影信息, 如果不存在就创建一个新的       |

> 需求功能已经明确, 首先我们可以先对功能设计路由

- 首先我们创建并导出默认的数据`data.ts`

```ts
export const movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 2010, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
  { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];
```

- 创建一个访问 `/movies/`的路由配置 `routes/movies.ts`, 并且添加查询列表

```ts
import { Router } from "express";
import { movies } from "./../data";

const MovieRouter = Router();

// 查询电影列表
MovieRouter.get("/list", (_, res) => {
  res.json(movies);
});

// 查询电影详情
MovieRouter.get("/detail/:id", (req, res) => {
  const result = movies.find(item => item.id === +req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(200);
    res.send("你查找的电影详情不存在");
  }
});

// 创建新的电影
MovieRouter.post("/add", (req, res) => {
  if (!req.body.name || !req.body.year || !req.body.rating) {
    res.status(200);
    return res.json({ success: false, msg: "填写信息不完整, 请重新查看!" });
  }
  res.json({ msg: "创建成功", success: true });
});

// 修改电影信息
MovieRouter.put("/modify/?:id", (req, res) => {
  if (!req.body.id) {
    return res.json({ success: false, msg: "id 不能为空" });
  }

  if (!req.body.name || !req.body.year || !req.body.rating) {
    return res.json({ success: false, msg: "参数缺失!" });
  }

  const index = movies.findIndex(item => item.id === +req.params.id);

  if (index > -1) {
    const newData = movies.map(item =>
      item.id === index
        ? {
            ...item,
            ...req.params
          }
        : item
    );
    console.log(newData);
    return res.json({ success: true, msg: "修改成功!" });
  } else {
    const newData = movies.concat(req.params);
    console.log(newData);
    // 此处需要修改
    res.json({ success: true, msg: "未找到, 已创建!" });
  }
});

// 删除
MovieRouter.delete("/:id", (req, res) => {
  if (!req.body.id) {
    return res.json({ success: false, msg: "id不能为空!" });
  }

  const index = movies.findIndex(item => item.id === +req.params.id);

  if (index > -1) {
    const newData = movies.filter(item => item.id !== +index);
    console.log(newData);
    return res.json({ success: true, msg: "删除成功!" });
  } else {
    res.json({ success: false, msg: "不存在对应记录!" });
  }
});

export default MovieRouter;
```

查询列表执行

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:4000/movies/list

```

详情查询

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:4000/movies/detail/101

```

添加执行

```bash
curl -X POST --data "name = Toy%20story&year = 1995" http://localhost:4000/movies/add
```

修改执行

```bash
curl -X PUT --data "id=12345&name = Toy%20story&year = 1995&rating = 8.5" http://localhost:4000/movies/modify/1
```

删除执行

```bash
curl -X DELETE --data "id=101" http://localhost:4000/movies/104
```

> 到此处我们已经将电影的基础增删改查已经开发完了, 可以利用其他如 `postman` 或 `postwomen`进行测试,

[完整代码](https://github.com/niexiaofei1988/learning/tree/master/examples/express/movies)

### 参考

- [ExpressJS-RESTFul API](https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm)
- [path-examples](https://expressjs.com/zh-cn/4x/api.html#path-examples)
