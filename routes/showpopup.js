const express=require('express')
const showopoupRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
var mongoose=require('mongoose')
const ejs = require('ejs');
const fs = require('fs');

let passing_content;

// showopoupRouter.get('/setpopup',function(req, res, next){
//     console.log("intsetPopup")
//     console.log(passing_content[0].title)
//     res.render("../views/popup", {'title': passing_content})
// })


showopoupRouter.get('/showpopup', function(req,res, next){

    var title= req.body.Title;
    var userID=req.body.User_ID;
    console.log("Title\n")
    console.log(title)
    var dbdata=mongoose.model('PostData');
-
    dbdata.find({'title':title, 'author': userID}, function(err, data){
        if(err)res.send(err);
        else{
            console.log(data);
            passsing_content=data;

            res.send('1');
        }
    }).select('-_id')

})



module.exports=showopoupRouter;