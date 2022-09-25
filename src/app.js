const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/auth');
const booksRouter = require('./routes/api/books');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/user', authRouter);
app.use('/api/books', booksRouter);

app.use((req, res) => {
  const { status = 404 } = res;
  res.status(status).json({ message: 'Not found', status });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message, status });
});

module.exports = app;
