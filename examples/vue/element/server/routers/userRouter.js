import koaRouter from '../app';
import user from '../controller/user/user';

const userRouter = new koaRouter();

userRouter.get('/login.json', user.login);
userRouter.post('/register.json', user.register);

export default userRouter;
