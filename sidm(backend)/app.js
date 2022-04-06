const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose');
const app = express()
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const Register = require('./routes/register')
const User = require('./routes/user')
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use('/sidm', Register)
app.use('/user', User)



const root = path.join(__dirname, 'dist', 'sidm');
app.get('*', function (req, res) {
    fs.stat(root + req.path, function (err) {
        if (err) {
            res.sendFile("index.html", { root });
        } else {
            res.sendFile(req.path, { root });
        }
    })
});


mongoose
    .connect(
        'mongodb://localhost:27017/sidm',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err); s
    });
