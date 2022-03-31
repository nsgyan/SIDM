const User = require('../models/user')
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
            console.log(err);

        })
    console.log(req.body);
}