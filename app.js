const serverless = require('serverless-http');
const createError = require('http-errors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/.netlify/functions/server', indexRouter);  // path must route to lambda
app.use('/', indexRouter);

app.use(session({
  genid: (req) => {
    return uuidv4();
  },
  resave: false,
  secret: 'Keep it secret',
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  req.session.accessToken = process.env.ACCESS_TOKEN || null;
  req.session.CLIENT_ID = process.env.CLIENT_ID || null;
  req.session.USER_ID = process.env.USER_ID || null;

  res.locals.CLIENT_ID = req.session.CLIENT_ID;
  res.locals.USER_ID = req.session.USER_ID;

  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
module.exports.handler = serverless(app);
