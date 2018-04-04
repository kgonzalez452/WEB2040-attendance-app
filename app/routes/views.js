module.exports = function(app){
    app.get('/', function (req, res) {
        if(req.user) {
          res.redirect('/profile');
        }
        else {
          res.render('index.ejs'); // load the index.ejs file
        }
      });

      app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
      });

      app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
      });

      app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
          user: req.user // get the user out of session and pass to template
        });
      });

      app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
      });

      app.get('/password-recovery', function (req, res) {
        res.render('password_recovery.ejs', { message: req.flash('passwordRecoveryMessage') } );
      });

      app.get('/update-profile', isLoggedIn, function (req, res) {
        res.render('update_profile.ejs', { 
          user: req.user,
          message: req.flash('updateProfileMessage') 
        });
      });

      app.get('*', function (req, res) {
        res.render('404.ejs');
      });

};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated());
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }