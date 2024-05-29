const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id:{type:Number},
    Username: String,
    password: String,
    name: String,
    email: String,
    phoneNumber: Number,
    loanOfficer: String,
    loanPending: String,
    creditScore: Number,
    checkingAccount: Number,
    Money: Number,
    pic:String
  });

  const Bankshem = mongoose.model('bankUser',UserSchema)

  module.exports = Bankshem