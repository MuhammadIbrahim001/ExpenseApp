
var { ExpenseDetailModel, CatergoriesModel } = require("../Models/models");
var ObjectId = require('mongodb').ObjectId;
module.exports = function (app) {
    // Requirement Form
    app.post("/add/income", (req, res) => {
        const newForm = req.body;
        console.log(newForm);
        ExpenseDetailModel.create(newForm, (err, data) => {
            err ?
                res.status(500).json(err) :
                res.status(200).json(data)
        })
    })

    //-----------------------------------------

    app.get("/total/income/:uID", (req, res) => {
        userID = req.params.uID;

        ExpenseDetailModel.aggregate([
            {
                '$match': {
                    'userID': new ObjectId(userID)
                }
            }, {
                '$group': {
                    '_id': null,
                    'totalIncome': {
                        '$sum': '$income'
                    }
                }
            }, {
                '$project': {
                    '_id': 0
                }
            }
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    })
    app.get("/total/expense/:uID", (req, res) => {
        userID = req.params.uID;
        CatergoriesModel.aggregate(
            [
                {
                    '$match': {
                        'userID': new ObjectId(userID)
                    }
                }, {
                    '$group': {
                        '_id': null,
                        'sum': {
                            '$sum': '$amount'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0
                    }
                }
            ], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            });
    })
    app.delete("/remove/income/:ID", (req, res) => {
        let userID = req.params.ID;

        ExpenseDetailModel.deleteMany({ userID: ObjectId(userID) }, (err, data) => {
            err ?
                res.status(500).json(err) :
                res.status(200).json(data)
        })
    });

    app.put("/income/:ID", (req, res) => {
        var userID = req.params.ID;
        var { income  } = req.body;
        ExpenseDetailModel.updateOne(
          { userID: ObjectId(userID) },
          {
            income: income,
    
          },
          function (err, result) {
            try {
              if (result.length == 0) {
                res.send("User not found");
              }
    
              res.send("Income has been updated Sucessfully!");
            } catch (error) {
              res.send(error);
              console.log(error);
            }
          }
        );
      });


}