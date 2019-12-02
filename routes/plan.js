var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

router.get('/requestAccept', function(req,res){
   res.render('../views/makePlan.ejs');
});

router.post('/sendReqID', function(req,res){

    var req_id=req.body.req_id;
    console.log("선택reqid"+req_id);
});

module.exports = router;