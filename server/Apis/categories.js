
var { CatergoriesModel } = require("../Models/models");
var ObjectId = require('mongodb').ObjectId;
module.exports = function (app) {
    // Requirement Form
    app.post("/add/categories", (req, res) => {
        const newForm = req.body;
        console.log(newForm);
        CatergoriesModel.create(newForm, (err, data) => {
            err ?
                res.status(500).json(err) :
                res.status(200).json(data)
        })
    })

    app.get("/categoies/:name", (req, res) => {
        let userID = req.params.ID;

        CatergoriesModel.find({ catergoryName: req.params.name }, (err, data) => {
            err ?
                res.status(500).json(err) :
                res.status(200).json(data)
        })
    })
    //--------------------------------------------

    app.get("/top/categories/:ID", (req, res) => {
        let userID = req.params.ID;
        CatergoriesModel.aggregate([
            {
                '$match': {
                    'userID': ObjectId(userID)
                }
            },
            {
                '$group': {
                    '_id': '$catergoryName',
                    'sum': {
                        '$sum': '$amount'
                    }
                }
            }, {
                '$sort': {
                    'sum': -1
                }
            }, {
                '$limit': 4
            }
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    })
    app.get("/monthly/expenses/:ID", (req, res) => {
        let userID = req.params.ID;
        CatergoriesModel.aggregate([


            {
                '$match': {
                    'userID': ObjectId(userID)
                }
            },
            {

                '$group': {
                    '_id': {
                        '$month': '$date'
                    },
                    'fieldN': {
                        '$sum': '$amount'
                    }
                }
            }, {
                '$sort': {
                    '_id': +1
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
    app.delete("/remove/categories/:ID", (req, res) => {
        let userID = req.params.ID;

        CatergoriesModel.deleteMany({ userID: ObjectId(userID) }, (err, data) => {
            err ?
                res.status(500).json(err) :
                res.status(200).json(data)
        })
    })
}