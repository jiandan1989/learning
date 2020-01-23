import uuidv1 from 'uuid/v1';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';

import { port, maxAgeTime } from './config';
import IndexRouter from './routes';
import LoginRouter from './routes/login';

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(
  session({
    genid() {
      return uuidv1();
    },
    secret: 'keyboard cat',
    httpOnly: false,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: maxAgeTime },
  })
);

// 设置模板引擎
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', IndexRouter);
app.use('/login', LoginRouter);

app.listen(port, () => {
  console.log(`sever running on http://localhost:${port}`);
});
