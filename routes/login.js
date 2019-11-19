var express = require('express');
var router = express.Router();

router.post('/login',function(req, res,next) {
    console.log('/login 호출됨.');

    var database=require('./model/usermodel');

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    //
    // // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
    // if (database) {
    //     authUser(database, paramId, paramPassword, function(err, docs) {
    //         let session=req.session;
    //
    //         if (err) {throw err;}
    //
    //         // 조회된 레코드가 있으면 성공 응답 전송
    //         if (docs) {
    //             console.dir(docs);
    //
    //             // 조회 결과에서 사용자 이름 확인
    //             var username = docs[0].name;
    //
    //             // res.cookie("user",paramId),{
    //             //     expires: new Date(Date.now()+900000),
    //             //     httpOnly: true
    //             // };
    //
    //             req.session.id=paramId;
    //
    //             res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    //             res.write('<h1>로그인 성공</h1>');
    //             res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
    //             res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
    //             res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
    //             res.end();
    //
    //         } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
    //             res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    //             res.write('<h1>로그인  실패</h1>');
    //             res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
    //             res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
    //             res.end();
    //         }
    //     });
    // } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
    //     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    //     res.write('<h2>데이터베이스 연결 실패</h2>');
    //     res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
    //     res.end();
    // }

});
router.post('/register', function(req, res, next) {

    var user_type =req.body.temp1;
    // console.log(user_type);
    if(user_type=="Planner"){
        res.render('plannerRegister', { title: 'Express' });
    }
    else{
        res.render('travelerRegister', { title: 'Express' });
    }

});
module.exports = router;