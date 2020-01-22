import { Router } from 'express';
import { movies } from './../data';

const MovieRouter = Router();

// 查询电影列表
MovieRouter.get('/list', (_, res) => {
  res.json(movies);
});

// 查询电影详情
MovieRouter.get('/detail/:id', (req, res) => {
  const result = movies.find((item) => item.id === +req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(200);
    res.send('你查找的电影详情不存在');
  }
});

// 创建新的电影
MovieRouter.post('/add', (req, res) => {
  if (!req.body.name || !req.body.year || !req.body.rating) {
    res.status(200);
    return res.json({ success: false, msg: '填写信息不完整, 请重新查看!' });
  }
  res.json({ msg: '创建成功', success: true });
});

// 修改电影信息
MovieRouter.put('/modify/?:id', (req, res) => {
  if (!req.body.id) {
    return res.json({ success: false, msg: 'id 不能为空' });
  }

  if (!req.body.name || !req.body.year || !req.body.rating) {
    return res.json({ success: false, msg: '参数缺失!' });
  }

  const index = movies.findIndex((item) => item.id === +req.params.id);

  if (index > -1) {
    const newData = movies.map((item) =>
      item.id === index
        ? {
            ...item,
            ...req.params,
          }
        : item
    );
    console.log(newData);
    return res.json({ success: true, msg: '修改成功!' });
  } else {
    const newData = movies.concat(req.params);
    console.log(newData);
    // 此处需要修改
    res.json({ success: true, msg: '未找到, 已创建!' });
  }
});

// 删除
MovieRouter.delete('/:id', (req, res) => {
  if (!req.body.id) {
    return res.json({ success: false, msg: 'id不能为空!' });
  }

  const index = movies.findIndex((item) => item.id === +req.params.id);

  if (index > -1) {
    const newData = movies.filter((item) => item.id !== +index);
    console.log(newData);
    return res.json({ success: true, msg: '删除成功!' });
  } else {
    res.json({ success: false, msg: '不存在对应记录!' });
  }
});

export default MovieRouter;
