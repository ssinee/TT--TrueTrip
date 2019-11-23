const express=require('express')
const showThemeRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');
const bodyParser=require('body-parser')
var mongoose=require('mongoose')




showThemeRouter.post('/showtheme',function(req, res, next){

    var theme= req.body.theme;
    var dbdata=mongoose.model('PostData');

    if(theme=="모두"){
        dbdata.find({}, function(err, data){
            if(err) res.send(err);
            else {
                res.send({'data': data})
            }
        }).select('-_id')
    }else{
        dbdata.find({theme: theme}, function(err, data){
            if(err) res.send(err);
            else {
                res.send({'data': data})
            }
        }).select('-_id')
    }
})

module.exports=showThemeRouter;

