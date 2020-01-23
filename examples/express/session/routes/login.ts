import { Router } from 'express';

const LoginRouter = Router();

LoginRouter.post('/', (req, res) => {
  // 只保存 userName
  req.session.userName = req.body.userName;
  return res.json({ success: true, data: '登录成功' });
});

LoginRouter.post('/logout', (req, res) => {
  // 退出时设置为空
  req.session.userName = null;
  res.json({ success: true });
});

export default LoginRouter;
