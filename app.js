const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

var passport = require('passport');
const app = express();
const ejs = require('ejs');
var logger = require('morgan');

const static=require('serve-static');
const path=require('path')
var multer=require('multer');
const DBData=require('./models/DBData');
const User= require('./model/usermodel');
const Planner=require('./model/plannermodel');
const fs= require('fs');


// Passport Config


// const LocalStrategy = require('passport-local').Strategy;
// const passportConfig = require('config/passport');

app.use(logger('dev'));
// Connect to MongoDB
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json())

// CONNECT TO MONGODB SERVER

mongoose.connect('mongodb://localhost:27017/TT', {
  authSource: "admin",
  useNewUrlParser:true,
  useUnifiedTopology:true
} ).then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.static('node_modules'))
app.use(express.static('views'))
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('scss'))
app.use(express.static('vendor'))
app.use(express.static('img'))
app.use('/upload', express.static('./upload'))

// app.use(express.static(path.join(__dirname,'/views')))

// EJS
// app.set('view engine', 'html')
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile)



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


// Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/passport'));
app.use('/', require('./routes/upload.js'));
app.use('/', require('./routes/showTheme.js'));
app.use('/', require('./routes/showPlannersImage'));

app.use('/', require('./routes/post'));
app.use('/', require('./routes/showpopup'));




const PORT = process.env.PORT || 5020;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
module.exports = app;
