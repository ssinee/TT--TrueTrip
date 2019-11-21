var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var User=mongoose.model('users');
var Planner=mongoose.model('planners');
var passport = require('passport');


router.route('/login').post(passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));


