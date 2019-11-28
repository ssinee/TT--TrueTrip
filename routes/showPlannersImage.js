const express=require('express')
const showPlannersImageRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')




showPlannersImageRouter.post('/showPlannersImage', function(req, res, next){
    var user_ID=req.body.UserID
    var dbdata=mongoose.model('PostData')
    console.log(user_ID);
    dbdata.find({author: user_ID}, function(err, data){
        if(err) res.send(err)
        else {
            res.send({'data': data})
        }
    }).select('-_id')
})


module.exports=showPlannersImageRouter;