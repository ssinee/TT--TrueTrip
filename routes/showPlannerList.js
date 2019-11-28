const express=require('express')
const showPlannersListRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')


//planner별로 list 보여주는 page
showPlannersListRouter.get('/pLists', function(req, res, next){
    res.render('../views/plannerList.ejs')
})




module.exports=showPlannersListRouter;


