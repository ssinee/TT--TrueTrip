var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var Planner=mongoose.model('planners');

router.post('/addPlanner', function(req, res, next) {

    console.log('/addPlanner 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;
    var paramName = req.body.name || req.query.name;
    var paramEmail= req.body.email || req.query.email;
    var paramCategory1= req.body.category1 || req.query.category1
    var paramCategory2= req.body.category2 || req.query.category2
    var paramCategory3= req.body.category3 || req.query.category3


    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramEmail);
    console.log(paramCategory1);

    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가

    addPlanner(paramId, paramPassword, paramName, paramEmail,paramCategory1,paramCategory2,paramCategory3, function(err, addedPlanner) {
            if (err) {throw err;}

            // 결과 객체 있으면 성공 응답 전송
            if (addedPlanner) {
                console.dir(addedPlanner);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();

                // res.render("plannerPhoto",{
                //     one:paramCategory1,
                //     two:paramCategory2,
                //     three:paramCategory3})

            } else {  // 결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가  실패</h2>');
                res.end();
            }
    });
});
var addPlanner = function (id, password, name, email,category1,category2,category3,callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

    // UserModel 인스턴스 생성
    var planner = new Planner({"id":id, "pw":password, "name":name,"email":email,"category1":category1,"category2":category2,"category3":category3});

    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    planner.save(function(err, addedPlanner) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, addedPlanner);

    });
};

module.exports = router;