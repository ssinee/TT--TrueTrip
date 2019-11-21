const express=require('express')
const showPlannersImageRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')




showPlannersImageRouter.post('/showPlannersImage', function(req, res, next){
    var user_ID=req.body.UserID
    var dbdata=mongoose.model('PostData')

    dbdata.find({author: user_ID}, function(err, data){
        if(err) res.send(err)
        else {
            console.log("_____________data in javascript \n\n")
            console.log(data)
            res.send({'data': data})
        }
    }).select('-_id')
})


module.exports=showPlannersImageRouter;