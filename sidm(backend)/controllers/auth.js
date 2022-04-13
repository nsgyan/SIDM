
const RegistrationForm = require('../models/registrationForm')
const User = require('../models/user')
const Register = require('../models/registrationForm')
const State = require('../models/state.model')
const jwt = require('jsonwebtoken');

exports.memberAuth = (req, res, next) => {
    const token = req.header('authorization');
    console.log(req, 'dfffffffffff')

    jwt.verify(token, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg', function (err, decoded) {
        if (decoded.panNumber) {
            RegistrationForm.find({ mobileNumber: decoded.mobileNumber, email: decoded.email, panNumberOfOrganization: decoded.panNumber })
                .then(data => {
                    if (data) {
                        next()
                    }
                    else {
                        res.status(401).send('invalid token')
                    }

                })
                .catch(err => {
                    res.send(err)
                })
        }
        else {
            console.log(err);
            res.status(401).send('Token expired  please login again')
        }

    })
}

exports.adminAuth = (req, res, next) => {
    const token = req.header('authorization');
    console.log(req, 'dfffffffffff')

    jwt.verify(token, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg', function (err, decoded) {
        if (decoded) {
            User.findOne({ email: decoded.email, password: decoded.password })
                .then(data => {
                    if (data) {
                        next()
                    }
                    else {
                        res.status(401).send('invalid token')
                    }
                })
        }
        else {
            console.log(err);
            res.status(401).send('Token expired  please login again')
        }

    })
}