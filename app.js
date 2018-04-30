const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const http = require('http').Server(app);
const config = require('./config');
const mongoose = require('mongoose');

const adminController = require('./controller/adminController/controller');
const bcryptUtility = require('./utility/bcrypt');
const isAuthenticated = require('./utility/isAuthenticated');

app.use(express.static(`${__dirname}/public`));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 5 * 10000000000, // khoang thoi gian luu cookie
  },
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  adminController.findUserByUsername(username)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new LocalStrategy((username, pwd, done) => {
  adminController.findUserByUsername(username)
    .then((user) => {
      if (user) {
        bcryptUtility.comparePassword(pwd, user.pwd)
          .then((result) => {
            if (result) {
              done(null, user);
            } else {
              done(null, false, { message: 'invalid password' });
            }
          });
      } else {
        done('invalid username');
      }
    })
    .catch((err) => {
      done(err);
    });
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

if (!process.env.NODE_ENV) {
  mongoose.connect(config.DB_Address);
}

http.listen(config.PORT, (err) => {
  if (err) {
    console.log('have error occur');
  } else {
    console.log(`Server is runing at ${config.PORT}`);
  }
});

module.exports = app;
