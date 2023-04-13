const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
 
const app = express(); 
 
 
 
 
 
//set views file
app.set('views',path.join(__dirname,'views'));
 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
 
 
 
let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    auth: {
    user: 'porcnakan760@gmail.com',
    pass: 'olbtbgstsahlhnfj'
    },
    tls: {
        rejectUnauthorized: false
    }
});
 
    
// Base index route
app.get('/',(req, res) => {
    res.render('email', {
        title: 'Send Emails with NodeJS and Express'
    });
});
 
    
        
app.post('/sendmail',(req, res) => {
    
    let to_email = req.body.to_email;
    let mail_subject = req.body.mail_subject;
    let message = req.body.message;
 
 
    let messageOptions = {
        from: 'dbekCapital <information@dbekCapital.com>',
        to: to_email,
        subject: mail_subject,
        // text: message
        html: message
    };
 
 
 
    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });
});
 
 
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
