// const fs = require('fs');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);
exports.createTransaction = factory.createOne(Transaction);
exports.updateTransaction = factory.updateOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);

exports.getIOs = catchAsync(async (req, res, next) => {
  console.log('aggre', req.query);
  req.query.farm = req.query.farm || '5de608e532c37a25186e3911'; //demo farm
  const groupDebit = await Transaction.aggregate([
    {
      $match: { farm: ObjectId(req.query.farm) }
    },
    // {
    //   $lookup: {
    //     from: Account.collection.name,
    //     localField: 'debit',
    //     foreignField: '_id',
    //     as: 'debit_account'
    //   }
    // },
    {
      $group: {
        _id: {
          month: { $month: '$effectiveDate' },
          year: { $year: '$effectiveDate' },
          account: '$debit',
          m: {
            $dateFromParts: {
              year: { $year: '$effectiveDate' },
              month: { $month: '$effectiveDate' },
              day: 1
            }
          }
        },
        countTransaction: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        avgAmount: { $avg: '$amount' }
      }
    }
  ]);
  const groupCredit = await Transaction.aggregate([
    {
      $match: { farm: ObjectId(req.query.farm) }
    },
    // {
    //   $lookup: {
    //     from: Account.collection.name,
    //     localField: 'debit',
    //     foreignField: '_id',
    //     as: 'debit_account'
    //   }
    // },
    {
      $group: {
        _id: {
          month: { $month: '$effectiveDate' },
          year: { $year: '$effectiveDate' },
          account: '$credit',
          m: {
            $dateFromParts: {
              year: { $year: '$effectiveDate' },
              month: { $month: '$effectiveDate' },
              day: 1
            }
          }
        },
        countTransaction: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        avgAmount: { $avg: '$amount' }
      }
    }
  ]);
  //   const features = new APIFeatures(Account.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();
  //   const accounts = await features.query;

  const flatDebit = groupDebit.map(e => {
    return { ...e._id, totalDebit: e.totalAmount };
  });
  const flatCredit = groupCredit.map(e => {
    return { ...e._id, totalCredit: e.totalAmount };
  });
  const nestedObject = flatDebit.concat(flatCredit).reduce((c, v) => {
    const a = v.account;
    const y = v.year;
    const m = v.month;
    c[a] = c[a] || {};
    c[a][y] = c[a][y] || {};
    c[a][y][m] = c[a][y][m] || {};
    c[a][y][m].totalDebit = c[a][y][m].totalDebit || v.totalDebit || 0;
    c[a][y][m].totalCredit = c[a][y][m].totalCredit || v.totalCredit || 0;
    c[a][y][m].net = c[a][y][m].totalDebit - c[a][y][m].totalCredit;
    return c;
  }, {});

  const nested2 = flatDebit.concat(flatCredit).reduce((c, v) => {});

  //   const sample = {
  //     2019: {
  //       2: { totalDebit: 500, totalCredit: 400, net: 100 },
  //       4: { totalDebit: 40, totalCredit: 100, net: -60 }
  //     },
  //     2020: {
  //       3: { totalDebit: 0, totalCredit: 0, net: 0 }
  //     }
  //   };
  //   const test = sample[2019][2].totalDebit
  // const doc = flatDebit;

  res.status(200).json({
    status: 'success',
    data: {
      flat: flatDebit.concat(flatCredit),
      nestedObject
    }
  });
});
