import express from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';

import { port } from './config';
import MovieRouter from './routes/movies';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/movies', MovieRouter);

app.listen(port, () => {
  console.log(chalk.blue.bold(`server on running at http://localhost:${port}`));
});
