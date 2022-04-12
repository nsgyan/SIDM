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
            res.send(err)
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
                res.status(404).send({ message: 'User does not exist' })
            }
        }).catch(err => {
            res.status(404).send(err)
        })
}

exports.getState = (req, res, next) => {
    State.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

}

exports.getEmail = (req, res, next) => {
    console.log('email', req.body);
    const email = req.body.email
    Register.findOne({ email: email })
        .then(data => {
            res.status(200).send(data)
        })
}
exports.getMobile = (req, res, next) => {
    // console.log(req.body);
    const mobileNumber = req.body.mobileNumber
    console.log('mobile.', mobileNumber);
    Register.findOne({ mobileNumber: mobileNumber })
        .then(data => {
            mobileNumber
            res.status(200).send(data)
        })
}
exports.getPan = (req, res, next) => {
    console.log('pan', req.body);
    const panNumberOfOrganization = req.body.panNumberOfOrganization
    Register.findOne({ panNumberOfOrganization: panNumberOfOrganization })
        .then(data => {
            res.status(200).send(data)
        })
}
exports.memberLogin = (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const pan = req.body.panNumberOfOrganization;
    const mobileNumber = req.body.mobileNumber
    RegistrationForm.findOne({ mobileNumber: mobileNumber, email: email, panNumberOfOrganization: pan })
        .then(data => {

            if (data) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: email,
                    panNumber: pan,
                    mobileNumber: mobileNumber
                }, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg'
                );

                res.status(200).send({ token: token })
            }
            else {

                res.status(404).send('user not Found')
            }
        }).catch(err => {
            res.status(404).send('not Found')
        })

}

exports.memberData = (req, res, next) => {
    const token = req.header('authorization');
    console.log(req, 'dfffffffffff')

    jwt.verify(token, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg', function (err, decoded) {
        if (decoded) {
            RegistrationForm.find({ mobileNumber: decoded.mobileNumber, email: decoded.email, panNumberOfOrganization: decoded.panNumber })
                .then(data => {
                    if (data) {

                        res.status(200).send(data)
                    }
                    else {
                        res.status(404).send('not Found user Data')
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