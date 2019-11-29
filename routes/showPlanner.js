const express=require('express')
const showPlannersListRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')




showPlannersListRouter.get('/plannerlist', function(req, res){
    res.render('../views/plannerList.ejs')
})









module.exports = showPlannersListRouter