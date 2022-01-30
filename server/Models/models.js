var mongoose = require("mongoose");

var {
  User,
  ExpenseDetail,
  Catergories,
} = require("./schemas");

var UserModel = mongoose.model("user", User);
var ExpenseDetailModel = mongoose.model("expensedetail", ExpenseDetail);
var CatergoriesModel = mongoose.model("categories", Catergories);


module.exports = {
  UserModel,
  ExpenseDetailModel,
  CatergoriesModel,
};

// var FileModel = mongoose.model("system_files", JSONFileSchema);
