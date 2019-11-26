var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var Planner=mongoose.model('planners');

router.post('/showlocation',function(req, res, next){

    var location= req.body.location;


    if(location=="모두"){
        Planner.find({}, function(err, data){
            if(err) res.send(err);
            else {
                res.send({'data': data})
            }
        }).select('-_id')
    }else{
        Planner.find({location: location}, function(err, data){
            if(err) res.send(err);
            else {
                res.send({'data': data})
            }
        }).select('-_id')
    }
})


module.exports = router;