var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var User=mongoose.model('users');

router.post('/', function(req, res, next) {

    console.log('/process/addTraveler 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;
    var paramName = req.body.name || req.query.name;
    var paramEmail= req.body.email || req.query.email;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramEmail);

    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가

    addUser( paramId, paramPassword, paramName, paramEmail, function(err, addedUser) {
            if (err) {throw err;}

            // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            } else {  // 결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가  실패</h2>');
                res.end();
            }
    });


});
var addUser = function(id, password, name, email,callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

    // UserModel 인스턴스 생성
    var user = new User({"id":id, "pw":password, "name":name,"email":email});

    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, addedUser);

    });
};
module.exports = router;