const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const port = 3110;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
   res.render('index', {title: 'Welcome'});
});
app.get('/about', (req, res) => {
    res.render('about',{title: 'About Us'});
});
app.get('/contact', (req, res) => {
    res.render('contact',{title: 'Contact Us'});
});
app.post('/contact/send', (req, res) => {
    console.log( 'POST', req.body);
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'clinton.milner@gmail.com',
            pass: 'cl!Nt0N311!'
        }
    });

    const mailOptions = {
        from: 'Clint Milner <clinton.milner@gmail.com>',
        to: 'me@clintmilner.com',
        text: `You have a Contact Form submission...\n ${req.body.name} | ${req.body.email} | ${req.body.message}`,
        html: `<p>You have a Contact Form submission...<br /> ${req.body.name} | ${req.body.email} | ${req.body.message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log('ERROR', error);
            res.redirect('/');
        } else {
            console.log('SUCCESS!', info.response);
            res.redirect('/');
        }
    });
});


app.listen(port);

console.log(`Server is running on port ${port}`);