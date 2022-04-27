const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const mongoose = require('mongoose');
const app = express()
const Register = require('./routes/register')
const User = require('./routes/user')

const path = require('path')
const fileUpload = require('express-fileupload');
const UploadFile = require('./controllers/UploadFile');
var cors = require('cors')
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/sidm', Register)
app.use('/user', User)
app.use('/upload', UploadFile)


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
        console.log(err); 
    });
