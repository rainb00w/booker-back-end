const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const authRouter = require('./routes/api/auth');
const trainingRouter = require('./routes/api/training')
const booksRouter = require('./routes/api/books');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/user', authRouter);
app.use('/api/training', trainingRouter)
app.use('/api/books', booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message, status });
});

module.exports = app;
