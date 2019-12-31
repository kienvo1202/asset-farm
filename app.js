// app.js is for Express stuff
const express = require('express');
const morgan = require('morgan');
const cardRouter = require('./routes/cardRoutes');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();

//1.GLOBAL MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json({ limit: '12kb' }));
app.use(express.static('public'));

//3. ROUTES
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/transactions', transactionRouter);

module.exports = app;
