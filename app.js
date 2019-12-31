// app.js is for Express stuff
const express = require('express');
const morgan = require('morgan');
const cardRouter = require('./routes/cardRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const compression = require('compression');
const app = express();
const path = require('path');

//1.GLOBAL MIDDLEWARE
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '12kb' }));

//3. ROUTES
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/transactions', transactionRouter);

//serve static
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
