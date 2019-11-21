const express = require('express');
const socket=require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

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

mongoose.connect('mongodb://localhost:27017/UserInfo', {

  authSource: "admin",
  useNewUrlParser:true,
  useUnifiedTopology:true
} ).then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


var User= require('./model/usermodel');
var Planner=require('./model/plannermodel');
const passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

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
  key: 'my session',
  secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
  resave: false,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
  saveUninitialized: false,      //세션 아이디를 실제 사용하기전에는 발급하지 않음
  cookie:{
    maxAge: 1000 * 60 * 60 * 24   //24시간 만기
  }
}));

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



// Routes
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var addTravelerRouter = require('./routes/addTraveler');
var addPlannerRouter = require('./routes/addPlanner');

app.use('/', require('./routes/index.js'));
app.use('/',loginRouter);
app.use('/',registerRouter);
app.use('/',addTravelerRouter);
app.use('/',addPlannerRouter);

//로그인화면에서 register 누르면 planner와 traveler 중 하나 선택하는 페이지로 이동
app.post('/select', function(req, res, next) {
  res.render('selectUserType', { title: 'Express' });
})

const PORT = process.env.PORT || 5020;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
module.exports = app;
