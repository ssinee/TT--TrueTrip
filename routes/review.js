var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var Request=mongoose.model('requests');
var Schedule=mongoose.model('schedules');
var Review=mongoose.model('reviews');
var Planner=mongoose.model('planners');

//receivedPlan.ejs에서 후기 등록하면 실행됨
router.post('/sendReview',function(req,res){
    
    var author=req.body.author;
    var score=req.body.score;
    var comment=req.body.comment;
    var originRequest=req.body.originRequest;
    var planner_id=req.body.planner_id;

    console.log(planner_id);

    var review= new Review({
        'author': author,
        'score': score,
        'comment': comment,
        'originRequest': originRequest,
        'state':true
    });

    //해당 플래너 댓글에 review 객체 추가
    Planner.findOneAndUpdate({id:planner_id},{$push:{"reviews":review}},function (err,data) {
        if (err) throw err;
        // console.log(data);
    });

});

router.post('/findReview',function(req,res){
    var planner=req.body.id;
    // console.log("플래너아이디"+planner);

    Planner.find({id:planner},function(err,data){
        if(err) throw err;
        var review_array=data[0].reviews;
        // console.log("리뷰 어레이ㅣ이이이"+review_array);
        res.send({data:review_array});
       
    })

});

router.post('/reviewState',function(req,res){
    var planner=req.body.id;
    // console.log("플래너아이디"+planner);

    Review.find({originRequest:planner},function(err,data){
        if(err) throw err;
        var state=data[0].state;
        // console.log("리뷰 어레이ㅣ이이이"+review_array);
        res.send({data:state});

    })

});


module.exports = router;