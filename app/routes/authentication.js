module.exports = function (app, passport) {
    var nodemailer = require('nodemailer');
    var student = require('../models/student');
    var async = require('async');
    var crypto = require('crypto');

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/email-confirmation/:emailToken', function (req, res) {
        var token = req.params.emailToken;
        console.log(token);
        asynq.waterfall([ // Runs the tasks array of functions in series, each passing their results to the next in the array. 
          function (done) {
            User.findOne({ 'emailConfirmationToken': token },
              function (err, user) {
                if (!user) {
                  req.flash('signupMessage', 'No user found')
                  return res.redirect('/signup');
                }
    
                //Set the emailConfirmed to true.
                user.emailConfirmed = true;
                user.emailConfirmationToken = undefined;
    
                user.save(function (err) {
                  if (err) {
                    req.flash('signupMessage', 'Database error')
                    return res.redirect('/signup');
                  }
                  done(err, user);
                });
              }
            );
          },
          function (user, done) {
            var smtpTransport = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'kgonzalez.techlaunch@gmail.com',
                pass: 'Extremejello14'
              }
            });
            var mailOptions = {
              to: user.email,
              from: 'Email Confirmed',
              subject: 'Your email has been confirmed.',
              text: 'Hello,\n\n' +
                'This is a confirmation that the email for your account ' + user.email + ' has been confirmed.\n'
            };
            smtpTransport.sendMail(mailOptions);
    
            req.flash('loginMessage', 'Email confirmed')
            return res.redirect('/login');
          }
        ], function (err) {
          if (err) return err;
          console.log('Email Confirmed');
        });
      });
    
}