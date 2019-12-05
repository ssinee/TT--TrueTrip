var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var Postdata=mongoose.model('PostData');
var Request=mongoose.model('requests');
var Schedule=mongoose.model('schedules');

let content_id;
let planner_id;

router.post('/request', function(req,res){
    content_id= req.body.ids;
    console.log('/request 호출됨');
    // console.log(content_id);
    // console.log(content_id.length);

    // res.render("../views/RequestForm.ejs");
    // console.log("데이터 리스트"+data_list[0]);
});

router.get('/requestform',function(req,res){

    res.render("../views/RequestForm.ejs",{content_id:content_id});

});

router.post('/showRequest',function(req,res){
    var data= req.body.content_id;
    // console.log("넘겨받은 데이터:"+data);
    Postdata.find({'_id':data},function(err,data) {
        console.log(data);
        planner_id=data[0].author;
        console.log("플래너id"+planner_id);
        // console.log("찾은데이터"+data);
        res.send({'data':data});
    })
});

router.post('/sendForm', function(req,res){

    console.log('/sendForm 호출됨');

    var senddata=req.body.senddata;
    var date= req.body.date;
    var start=req.body.start;
    var end=req.body.end;
    var numofpeople=req.body.numofpeople;
    var age=req.body.age;
    var usecar=req.body.usecar;
    var yesarray=req.body.yesarray;
    var noarray=req.body.noarray;
    var addition=req.body.addition;
    var author=req.user.id;
    var planner=planner_id;

    console.log(author);


    console.log(senddata);

    var request= new Request({
        "planner":planner_id,"author":author,"selectpost":senddata,"date":date,
        "start":start,"end":end,"people":numofpeople,"age":age,"car":usecar,
        "yes_info":yesarray, "no_info":noarray, "addition":addition
    });
    request.save(function(err){
        if(err) throw err;
    })
    // console.log(content_id);
    // console.log(content_id.length);

    // res.render("../views/RequestForm.ejs");
    // console.log("데이터 리스트"+data_list[0]);

    res.render('/');
});


router.get('/reservation_planner',function(req,res){
    res.redirect('/reservation_planner/'+req.user.id);
    // res.render('../views/reservation_planner.ejs');
});

router.get('/reservation_planner/:id',function(req,res){
    var data_array=new Array();
    var data_length;

    Request.find({'planner':req.params.id},function(err,data){
        if(err) throw err;
        console.log(data);
        data_length=data.length;
        console.log(data_length);
        console.log(typeof(data));
        var req_id=new Array();
        for(var i =0;i<data_length;i++){
            req_id=data[i]._id;
            console.log(req_id);
            // var post_len=postid.length;
            // console.log(postid[0]);
            // for (var j=0; j<post_len;j++){
            //     Postdata.find({_id:postid[j]}, function(err,post){
            //         if(err) throw err;
            //         console.log(post);
            //         console.log(post[0].title);
            //     })
            // }
        }
        res.render('../views/reservation_planner.ejs',{data_length:data_length,send_data:data})
    })

});

router.get('/reservation_traveler',function(req,res){
    res.redirect('/reservation_traveler/'+req.user.id);
    // res.render('../views/reservation_planner.ejs');
});

router.get('/reservation_traveler/:id',function(req,res){

    var data_array=new Array();
    var data_length;

    Request.find({'author':req.params.id},function(err,data){
        if(err) throw err;
        console.log(data);
        data_length=data.length;
        console.log(data_length);
        console.log(typeof(data));
        var req_id=new Array();
        for(var i =0;i<data_length;i++){
            req_id=data[i]._id;
            console.log(req_id);
            // var post_len=postid.length;
            // console.log(postid[0]);
            // for (var j=0; j<post_len;j++){
            //     Postdata.find({_id:postid[j]}, function(err,post){
            //         if(err) throw err;
            //         console.log(post);
            //         console.log(post[0].title);
            //     })
            // }
        }
        res.render('../views/reservation_traveler.ejs',{data_length:data_length,send_data:data})
    });

});
router.post('/findTitle',function(req,res){
    var data= req.body.postid;
     console.log("넘겨받은 데이터:"+data);
    Postdata.find({'_id':data},function(err,data) {
        console.log(data);
        var title=data[0].title;
        console.log("제목"+title);
        // console.log("찾은데이터"+data);
        res.send({'post_title':title});
    })
});

router.post('/reject',function(req,res){
    console.log("/reject 호출됨")
    var data= req.body.data;
    console.log(data[0]);
    var find_id=data[0];
    var state=data[0].confirm;

    Request.findOneAndUpdate({_id:find_id},{$set:{"confirm":false}},function (err,data) {
        if (err) throw err;
        console.log("찾찾찾찾찾찾찾데이터"+data);
        var result='요청이 거절되었습니다.';
        // console.log(data[0].confirm);
        res.send({result:result});
    });

});

router.post('/checkPlan', function(req,res){
    console.log("/checkPlan 호출됨");
    var reqid=req.body.reqid;
    console.log(reqid);
    Schedule.find({'originRequest':reqid},function(err,data){
        if(err) throw err;
        console.log(data);
        // res.render('../views/receivedPlan.ejs',{data:data});
        res.send({data:data});

    })

});

router.post('/checkReject', function(req,res){
    var reqid=req.body.reqid;
    Request.find({'_id':reqid},function(err,data){
        if(err) throw err;
        console.log(data);
        res.send({data:data});
    })

});

module.exports = router;