var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var User=mongoose.model('users');
var Planner=mongoose.model('planners');
var passport = require('../config/passport');


router.post('/login',function(req, res,next) {
        console.log('/login 호출됨.');
    var isValid=true;
    var errors={};

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    if(!paramId){
        isValid = false;
        errors.id = "Id is required!";
    }
    if(!paramPassword){
        isValid = false;
        errors.pw = "Password is required!";
    }

    if(isValid){
        next();
    } else{
        req.flash("errors",errors);
        // res.redirect("/");
    }
    },
    passport.authenticate("local-login",{
        successRedirect:"/",
        failureRedirect:"/login"}
    ));

//
//     // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
//
//         authUser(paramId, paramPassword, function(err, docs) {
//
//             if (err) {throw err;}
//
//             // 조회된 레코드가 있으면 성공 응답 전송
//             if (docs) {
//                 console.dir(docs);
//
//                 // 조회 결과에서 사용자 이름 확인
//                 // var username = docs[0].name;
//
//                 // res.cookie("user",paramId),{
//                 //     expires: new Date(Date.now()+900000),
//                 //     httpOnly: true
//                 // };
//                 req.session.id=paramId;
//                 res.redirect('/myindex');
//
//                 // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//                 // res.write('<h1>로그인 성공</h1>');
//                 // res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
//                 // res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
//                 // res.end();
//
//             } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
//                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>로그인  실패</h1>');
//                 res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
//                 res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
//                 res.end();
//             }
//         });
//
//
// });
//
// router.get('/myindex', function(req, res, next) {
//     res.render('../views/myindex.html', { title: 'Express' });
// });
//
// var authUser = function(id, password, callback) {
//     console.log('authUser 호출됨 : ' + id + ', ' + password);
//
//     // 아이디와 비밀번호를 이용해 검색
//     User.find({"id":id, "pw":password}, function(err, results) {
//         if (err) {  // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
//             callback(err, null);
//             return;
//         }
//
//         console.log('아이디 [%s], 패스워드 [%s]로 사용자 검색결과', id, password);
//         console.dir(results);
//
//         if (results.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
//             console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
//             callback(null, results);
//         } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
//             Planner.find({"id":id, "pw":password}, function(err, results) {
//                 if (err) {  // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
//                     callback(err, null);
//                     return;
//                 }
//
//                 console.log('아이디 [%s], 패스워드 [%s]로 사용자 검색결과', id, password);
//                 console.dir(results);
//
//                 if (results.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
//                     console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
//                     callback(null, results);
//                 } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
//                     console.log("일치하는 사용자를 찾지 못함.");
//                     callback(null, null);
//                 }
//             });
//             // console.log("일치하는 사용자를 찾지 못함.");
//             // callback(null, null);
//         }
//     });
// };


module.exports = router;