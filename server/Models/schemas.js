var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  email: String,
  password: String,
});

var ExpenseDetail= new Schema({
  userID:Schema.ObjectId,
  income:Number,
});
var Catergories= new Schema({
userID:Schema.ObjectId,
catergoryName:String,
amount:Number,
title:String,
description:String,
date:Date,

});
module.exports = {
 User,
 ExpenseDetail,
 Catergories
};
