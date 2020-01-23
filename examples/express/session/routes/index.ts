import express from 'express';
import { maxAgeTime } from '../config';

const IndexRouter = express.Router();

IndexRouter.get('/', (req, res) => {
  if (req.session && !req.session.userName) {
    res.redirect('/login');
  } else {
    res.render('index', {
      title: '首页',
      sessionInfo: {
        max: maxAgeTime / 1000,
        userName: req.session.userName,
      },
    });
  }
});

IndexRouter.get('/login', (_, res) => {
  res.render('login', {
    title: '登录页',
  });
});

IndexRouter.post('/test/seesion', (req, res) => {
  if (req.session.userName) {
    // console.log('>>>>>>>>>>我还在!');
    res.json({ success: true, msg: '你好, 我还在!' });
  } else {
    res.json({ success: true, msg: '你好, 超时了, 稍后跳转登录页', code: 'timeout' });
    // console.log('你在哪里呢>>>>>>>>>');
  }

  res.json({ success: true });
});

export default IndexRouter;
