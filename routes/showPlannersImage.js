const express=require('express')
const showPlannersImageRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')

var dbdata=mongoose.model('PostData')



showPlannersImageRouter.get('/deletePlannersImage', function(req, res, next){

    dbdata.remove({}, function(err){
        if(err){
            console.log(err)
        }else {
            res.end('success');
        }
    });
});

showPlannersImageRouter.post('/showPlannersImage', function(req, res, next){
    var user_ID=req.body.UserID
 
    dbdata.find({author: user_ID}, function(err, data){
        if(err) res.send(err)
        else {
            res.send({'data': data})
        }
    })
});


module.exports=showPlannersImageRouter;
