
var { UserModel } = require("../Models/models");
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');
var { verifyToken, createToken } = require('../Jwt/Jwt');
module.exports = function (app) {
    // Requirement Form
    app.post("/auth/signup", async (req, res) => {
        var { name, email, password } = req.body
        console.log(email + "........................." + password)
        try {
            if (email === undefined || password === undefined)
                res.status(404).json({ error: 'Body incomplete' });
            const userExist = await UserModel.findOne({ email: email });
            if (userExist) {
                return res.json({ message: "Email already Exist" });
            }
            bcrypt.hash(password, 12).then((hash) => {
                console.log('hashing done');
                const user = new UserModel({
                    email: email,

                    name: name, password: hash
                });

                user.save(function (err) {
                    if (err) {
                        res.json({ status: 'error', error: err.stack });
                        return;
                    };
                    var token = createToken(`${user._id}`);
                    res.json({ status: 'Ok', userId: user._id, token: token });
                });
            });
        }
        catch (err) {
            console.log(err);
        }

    })
    app.post('/auth/signin', async (req, res) => {

        var { email, password } = req.body;
        if (email === undefined || password === undefined)
            res.status(404).json({ error: 'Body incomplete' });
        else {
            var user = await UserModel.findOne({ email });
            if (user != null) {
                bcrypt.compare(password, user.password).then(async (value) => {
                    console.log(value)
                    if (value) {

                        var token = createToken(`${user._id}`);
                        return res.json({
                            status: 'Ok',
                            userId: user.id,
                            type: user.Type,
                            token: token,
                        });

                    } else {
                        return res.json({ error: 'Incorrect Password' });
                    }
                });
            } else {
                return res.json({ error: 'User Not Found' });
            }
        }
    });
    app.put('/auth/ChangePassword/:uID', async (req, res) => {
        var id=req.params.uID;
        var { oldPassword, newPassowrd,  } = req.body;
        console.log(id);
        if (oldPassword === undefined || newPassowrd === undefined)
            res.status(404).json({ error: 'Body incomplete' });
        else {
            console.log(id+"   " + newPassowrd );
            var user = await UserModel.findOne({ _id: ObjectId(id) });

            if (user != null) {
                bcrypt.compare(oldPassword, user.password).then(async (value) => {
                    console.log(value)
                    if (value) {

                        bcrypt.hash(newPassowrd, 12).then((hash) => {
                            console.log('hashing done');
                            UserModel.updateOne(
                                { _id: ObjectId(id) },
                                {
                                    password: hash

                                },
                                function (err, result) {

                                    if (err) {
                                        res.json({ status: 'error', error: err.stack });
                                        return;
                                    };

                                    res.json({ status: 'Ok', userId: user._id, });

                                }
                            );
                        });

                    } else {
                        return res.json({ error: 'Incorrect Password' });
                    }
                });
            } else {
                return res.json({ error: 'User Not Found' });
            }
        }
    });
  

    //--------------------------------------------
    app.get("/getUser/:ID", (req, res,) => {
        const uID = req.params.ID;
        console.log(uID);
        UserModel.find({ _id: uID }, (err, data) => {
          err ?
            res.status(500).json( err ) :
            res.status(200).json(data )
        })
      })

}