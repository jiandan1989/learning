import KoaRouter from '../app';
import user from '../controller/user/user';

const userRouter = new KoaRouter();

userRouter.get('/login.json', user.login);
userRouter.post('/register.json', user.register);

export default userRouter;
