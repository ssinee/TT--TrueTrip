const express = require('express');
const socket=require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
var passport = require('passport');
const app = express();
const ejs = require('ejs');
var logger = require('morgan');
var path = require('path');


// Passport Config


// const LocalStrategy = require('passport-local').Strategy;
// const passportConfig = require('config/passport');

app.use(logger('dev'));
// Connect to MongoDB
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER

mongoose.connect('mongodb://localhost:27017/database', {

  authSource: "admin",
  useNewUrlParser:true,
  useUnifiedTopology:true
} ).then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


var User= require('./model/usermodel');
var Planner=require('./model/plannermodel');

// app.use('/dataset',express.static('dataset'));
app.use(express.static('views'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('scss'));
app.use(express.static('vendor'));
// EJS

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
  key: 'my',
  secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
  resave: false,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
  saveUninitialized: true,      //세션 아이디를 실제 사용하기전에는 발급하지 않음
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 //24시간 만기
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()){
        console.log('isauthenticated');
        return next();
    }
    console.log('인증안됨');
    res.redirect('/main');
};


// Routes

var passportRouter=require('./routes/passport');

// app.get('/profile',isAuthenticated,function(req, res, next) {
//     res.send(req.user)
// })
app.use('/', require('./routes/index.js'));
app.use('/',passportRouter);


const PORT = process.env.PORT || 5020;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
module.exports = app;
