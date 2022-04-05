const User = require('../models/user')
const Register = require('../models/registrationForm')
const State = require('../models/state.model')
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
                res.status(200).send(data)
            }
            else {
                res.status(404).send({ message: 'User does not exist' })
            }
        }).catch(err => {

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