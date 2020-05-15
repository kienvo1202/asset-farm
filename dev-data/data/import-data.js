const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const IO = require('../../models/ioModel');
const Asset = require('../../models/assetModel');
const Account = require('../../models/accountModel');
const User = require('../../models/userModel');
const Farm = require('../../models/farmModel');
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
const ios = JSON.parse(fs.readFileSync(`${__dirname}/ios.json`, 'utf-8'));
const assets = JSON.parse(fs.readFileSync(`${__dirname}/assets.json`, 'utf-8'));
const accounts = JSON.parse(fs.readFileSync(`${__dirname}/accounts.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const farms = JSON.parse(fs.readFileSync(`${__dirname}/farms.json`, 'utf-8'));
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transactions.json`, 'utf-8')
);

//IMPORT to DB
const importData = async () => {
  try {
    // await IO.create(ios); //create can be use for an array of objects
    // await Asset.create(assets); 
    //await Account.create(accounts); 
    // await User.create(users);    
    // await Farm.create(farms);    
    await Transaction.create(transactions);
    console.log('Data loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await IO.deleteMany();
    // await Asset.deleteMany();
    //await Account.deleteMany();
    // await User.deleteMany();
    // await Farm.deleteMany();
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
