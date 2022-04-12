
const RegistrationForm = require('../models/registrationForm')
const User = require('../models/user')
const Register = require('../models/registrationForm')
const State = require('../models/state.model')
const jwt = require('jsonwebtoken');

exports.memberAuth = (req, res, next) => {
    const token = req.header('authorization');
    console.log(req, 'dfffffffffff')

    jwt.verify(token, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg', function (err, decoded) {
        if (decoded) {
            next()
        }
        else {
            console.log(err);
            res.status(401).send('Token expired  please login again')
        }

    })
}