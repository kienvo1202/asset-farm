// server.js is for NodeJS stuff
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);

mongoose
  //.connect(process.env.DATABASE_LOCAL, { //connect to local databse
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true //shut off deprecation warning
  })
  .then(() => {
    console.log('DB Connected!');
  })
  .catch(console.log('oh crap ...'));

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('App started at ', port);
});
