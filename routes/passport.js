var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var User=mongoose.model('users');
var Planner=mongoose.model('planners');
var passport = require('passport');


var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()){
        console.log('isauthenticated');
        return next();
    }
    console.log('인증안됨');
    res.redirect('/login');
};
var noPermission = function(req,res){
    req.flash("errors", {login:"You don't have permission"});
    req.logout();
    res.redirect("/login");
};



router.post('/select', function(req, res, next) {
    res.render('selectUserType', { title: 'Express' });
});

router.post('/register_planner', function(req, res, next) {
     res.render('plannerRegister', { title: 'Express' });
});

router.post('/register_traveler', function(req, res, next) {
    res.render('travelerRegister', { title: 'Express' });
});




router.get('/profile',isAuthenticated, function (req, res) {
    res.render('profile',{
        title: 'My Info',
        user_info: req.user
    })
});

// router.get('/mypage',isAuthenticated,function (req, res) {
//     res.render('mypage',{
//         title: 'My Info',
//         user_info: req.user
//     })
// });
// router.get('/mypage',function (req, res) {
//     res.render('plannerpage',{
//         title: 'My Info',
//         user_info: req.user
//     })
// });
router.route('/login').get(function(req, res) {
    console.log('/login 패스 요청됨.');
    res.render('login', {message: req.flash('loginMessage')});
});

router.route('/login').post(passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));

router.route('/addTraveler').get(function(req, res) {
    console.log('/addTraveler 패스 요청됨.');
    res.render('travelerRegister.ejs', {message: req.flash('signupMessage')});
});
router.route('/addTraveler').post(passport.authenticate('local-traveler', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true
}));

router.route('/addPlanner').get(function(req, res) {
    console.log('/addPlanner 패스 요청됨.');
    res.render('plannerRegister.ejs', {message: req.flash('signupMessage')});
});
router.route('/addPlanner').post(passport.authenticate('local-planner', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true
}));


// 로그아웃 - 로그아웃 요청 시 req.logout() 호출함
router.route('/logout').get(function(req, res) {
    console.log('/logout 패스 요청됨.');

    req.logout();
    res.redirect('/');
});

var LocalStrategy = require('passport-local').Strategy;

//패스포트 로그인 설정
passport.use('local-login', new LocalStrategy({
    usernameField : 'id',
    passwordField : 'pw',
    passReqToCallback : true   // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, id, password, done) {
    console.log('passport의 local-login 호출됨 : ' + id + ', ' + password);


    User.findOne({ 'id' :  id }, function(err, user) {
        if (err) { return done(err); }

        // 등록된 사용자가 없는 경우
        if (!user) {
            Planner.findOne({ 'id' :  id }, function(err, planner) {
                if (err) { return done(err); }

                // 등록된 사용자가 없는 경우
                if (!planner) {

                    console.log('계정이 일치하지 않음.');
                    return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
                }

                // 비밀번호 비교하여 맞지 않는 경우
                // var authenticated = user.authenticate(password, user._doc.salt, user._doc.hashed_password);
                // var authenticated = user.authenticate(password,  user._doc.pw);
                if (password!=planner.pw) {
                    console.log('비밀번호 일치하지 않음.');
                    return done(null, false, req.flash('loginMessage', '비밀번호가 일치하지 않습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
                }

                // 정상인 경우
                console.log('계정과 비밀번호가 일치함.');
                return done(null, planner);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
            });
            // console.log('계정이 일치하지 않음.');
            // return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
        }

        // 비밀번호 비교하여 맞지 않는 경우
        // var authenticated = user.authenticate(password, user._doc.salt, user._doc.hashed_password);
        // var authenticated = user.authenticate(password,  user._doc.pw);
        else {
            if (password != user.pw) {
                console.log('비밀번호 일치하지 않음.');
                return done(null, false, req.flash('loginMessage', '비밀번호가 일치하지 않습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
            }

            // 정상인 경우
            console.log('계정과 비밀번호가 일치함.');
            return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
        }
    });

}));


// 패스포트 회원가입 설정
passport.use('local-traveler', new LocalStrategy({
    usernameField : 'id',
    passwordField : 'pw',
    passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, id, pw, done) {
    // 요청 파라미터 중 name 파라미터 확인
    var paramName = req.body.name || req.query.name;
    var paramEmail= req.body.email || req.query.email;

    console.log('passport의 local-signup 호출됨 : ' + id + ', ' + pw + ', ' + paramName);

    // findOne 메소드가 blocking되지 않도록 하고 싶은 경우, async 방식으로 변경
    process.nextTick(function() {

        User.findOne({ 'id' :  id }, function(err, user) {
            // 에러 발생 시
            if (err) {
                return done(err);
            }

            // 기존에 사용자 정보가 있는 경우
            if (user) {
                console.log('기존에 계정이 있음.');
                return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
            } else {
                // 모델 인스턴스 객체 만들어 저장
                var newuser = new User({"id":id, "pw":pw, "name":paramName,"email":paramEmail});
                newuser.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    console.log("사용자 데이터 추가함.");
                    return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
                });
            }
        });
    });

}));


passport.use('local-planner', new LocalStrategy({
    usernameField : 'id',
    passwordField : 'pw',
    passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, id, pw, done) {
    // 요청 파라미터 중 name 파라미터 확인
    var paramName = req.body.name || req.query.name;
    var paramEmail= req.body.email || req.query.email;
    var paramCategory1= req.body.category1 || req.query.category1;
    var paramCategory2= req.body.category2 || req.query.category2;
    var paramCategory3= req.body.category3 || req.query.category3;
    var location = req.body.location || req.query.location;

    //기본 프로필 설정을 위한 부분
    var parampath= "upload_profile/default_profile.jpg";

    console.log('passport의 local-signup 호출됨 : ' + id + ', ' + pw + ', ' + paramName);

    // findOne 메소드가 blocking되지 않도록 하고 싶은 경우, async 방식으로 변경
    process.nextTick(function() {

        Planner.findOne({ 'id' :  id }, function(err, user) {
            // 에러 발생 시
            if (err) {
                return done(err);
            }

            // 기존에 사용자 정보가 있는 경우
            if (user) {
                console.log('기존에 계정이 있음.');
                return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
            } else {
                // 모델 인스턴스 객체 만들어 저장
                var planner = new Planner({"id":id, "pw":pw, "name":paramName,"email":paramEmail,
                    "category1":paramCategory1,"category2": paramCategory2,"category3":paramCategory3, "location":location, "path":parampath});
                planner.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    console.log("사용자 데이터 추가함.");
                    return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
                });
            }
        });
    });

}));

// 사용자 인증 성공 시 호출
// 사용자 정보를 이용해 세션을 만듦
// 로그인 이후에 들어오는 요청은 deserializeUser 메소드 안에서 이 세션을 확인할 수 있음
passport.serializeUser(function(user, done) {
    console.log('serializeUser() 호출됨.');
    console.dir(user);

    done(null, user);  // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
});

// 사용자 인증 이후 사용자 요청 시마다 호출
// user -> 사용자 인증 성공 시 serializeUser 메소드를 이용해 만들었던 세션 정보가 파라미터로 넘어온 것임
passport.deserializeUser(function(user, done) {
    console.log('deserializeUser() 호출됨.');
    console.dir(user);

    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    // 두 번째 파라미터로 지정한 사용자 정보는 req.user 객체로 복원됨
    // 여기에서는 파라미터로 받은 user를 별도로 처리하지 않고 그대로 넘겨줌
    done(null, user);
});

module.exports = router;