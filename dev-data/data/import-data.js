const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Card = require('../../models/cardModel');
const User = require('../../models/userModel');
const Transaction = require('../../models/transactionModel');

dotenv.config({ path: `${__dirname}/../../config.env` });
console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connected');
  });

//READ JSON
const cards = JSON.parse(fs.readFileSync(`${__dirname}/cards.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transactions.json`, 'utf-8')
);

//IMPORT to DB
const importData = async () => {
  try {
    await Card.create(cards); //create can be use for an array of objects
    await User.create(users);
    await Transaction.create(transactions);
    console.log('Data loaded!', transactions);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Card.deleteMany();
    await User.deleteMany();
    await Transaction.deleteMany();
    console.log('Del all');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
