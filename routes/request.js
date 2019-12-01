var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var Postdata=mongoose.model('PostData');
var Request=mongoose.model('requests');

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


    // for(var i=0; i<content_id.length;i++){
    //     Postdata.find({_id:content_id[i]},function(err,data){
    //         console.log(data);
    //         request.selectpost[i]=data;
    //         request.save(function(err){
    //             if(err){
    //                 console.log(err);
    //             }
    //             console.log("request:"+request);
    //             res.render("../views/RequestForm.ejs",{data:request});
    //         });
    //
    //         console.log(request.selectpost[i]);
    //     });
    // }

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
});

module.exports = router;