// app.js is for Express stuff
const express = require('express');
const morgan = require('morgan');
const ioRouter = require('./routes/ioRoutes');
const assetRouter = require('./routes/assetRoutes');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const userRouter = require('./routes/userRoutes');
const farmRouter = require('./routes/farmRoutes');
const productRouter = require('./routes/productRoutes');
const productRequestRouter = require('./routes/productRequestRoutes');
const compression = require('compression');
const app = express();
const path = require('path');

//1.GLOBAL MIDDLEWARE
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '12kb' }));

//3. ROUTES
//app.use('/api/v1/ios', ioRouter);
//app.use('/api/v1/assets', assetRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/farms', farmRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/productRequests', productRequestRouter);

//serve static
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

module.exports = app;
