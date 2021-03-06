import env from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import employeeRouter from './server/v1/routes/employee.route';
import articleRouter from './server/v1/routes/article.route';
import commentRouter from './server/v1/routes/comment.route';

import employeeRoute from './server/v2/routes/employeeRoute';
import articleRoute from './server/v2/routes/articleRoute';

env.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(employeeRouter);
app.use(articleRouter);
app.use(commentRouter);

app.use(employeeRoute);
app.use(articleRoute);

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Teamwork API'
  });
});

app.use('*', (req, res) => {
  return res.status(405).json({
    status: 405,
    message: 'Invalid URL'
  });
});

let PORT;

if (process.env.NODE_ENV === 'test') {
  PORT = 3000;
} else {
  PORT = process.env.PORT || 2000;
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}...`);
});

module.exports = app;
