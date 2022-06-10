const RegistrationForm = require('../models/registrationForm')
const User = require('../models/user')
const Register = require('../models/registrationForm')
const State = require('../models/state.model')
const jwt = require('jsonwebtoken');
exports.addAdminUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        email: email,
        password: password,
    })
    user.save()
        .then(data => {
            res.status(200).send(Data)

        }).catch(err => {
            res.json("internal server error");
        })
}

exports.loginVerify = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email, password: password })
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: email,
                    password: password,
                }, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg'
                );

                res.status(200).send({ token: token })
            }
            else {
                res.status(401).send({ message: 'User does not exist' })
            }
        }).catch(err => {
            res.json("internal server error");
        })
}

exports.getState = (req, res, next) => {
    State.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json("internal server error");
        })

}

exports.getEmail = (req, res, next) => {
    const email = req.body.email
    Register.findOne({ email: email })
        .then(data => {
            res.status(200).send(data)
        }).catch(err=>{
            res.json("internal server error");
        })
}

exports.getMobile = (req, res, next) => {
    const mobileNumber = req.body.mobileNumber
    Register.findOne({ mobileNumber: mobileNumber })
        .then(data => {
            mobileNumber
            res.status(200).send(data)
        })
        .catch(err => {
            res.json("internal server error");
        })
}

exports.getPan = (req, res, next) => {
    const panNumber = req.body.panNumber
    Register.findOne({ panNumber: panNumber })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.json("internal server error");
        })
}
exports.memberLogin = (req, res, next) => {
    const email = req.body.email;
     const pan = req.body.panNumber;
    const mobileNumber = req.body.mobileNumber
    RegistrationForm.findOne({ mobileNumber: mobileNumber, email: email, panNumber: pan })
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: email,
                    panNumber: pan,
                    mobileNumber: mobileNumber
                }, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg'
                );

                res.status(200).send({ token: token,data:data })
            }
            else {

                res.status(401).send('user not Found')
            }
        }).catch(err => {
            res.status(401).send('not Found')
        })

}

exports.memberData = (req, res, next) => {
    const token = req.header('authorization');

    jwt.verify(token, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg', function (err, decoded) {
        if (decoded) {
            RegistrationForm.find({ mobileNumber: decoded.mobileNumber, email: decoded.email, panNumber: decoded.panNumber })
                .then(data => {
                    if (data) {
                        res.status(200).send(data)
                    }
                    else {
                        res.status(401).send('not Found user Data')
                    }

                })
                .catch(err => {
                    res.json("internal server error");
                })
        }
        else {
            res.status(401).send('Token expired  please login again')
        }

    })
}