var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var Request=mongoose.model('requests');

let req_id;

router.post('/sendReqID', function(req,res){

    req_id=req.body.req_id;
    console.log("선택reqid"+req_id);
    res.render('../views/makePlan.ejs');
});

router.get('/sendReqID', function(req,res){
    Request.find({'_id':req_id},function(err,data){
        if(err) throw err;
        console.log(data);
        res.render('../views/makePlan.ejs',{data:data});
    })

});

// router.post('/findRequest', function(req,res){
//     var id=req.body.find_id;
//     Request.find({'_id':id},function(err,data){
//         if(err) throw err;
//         res.send({data:data});
//     })
// });

module.exports = router;