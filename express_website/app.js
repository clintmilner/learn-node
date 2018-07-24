const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const port = 3110;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get('/', (req, res) => {
   console.log('Hello World');
   res.send('Hello World');
});


app.listen(port);

console.log(`Server is running on port ${port}`);