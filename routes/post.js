var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
const multer=require('multer');
var Planner=mongoose.model('planners');

//multer 미들웨어 등록 -> 사진 등록시 upload 파일에 저장
let upload=multer({
    dest:'upload_profile'
})

// router.get("/post",function(req,res){
//     PlannerPost.find({})
//         .populate("author")
//         .exec(function(err,posts){
//             if(err) return res.json(err);
//             res.render("/main",{posts:posts});
//         });
// });
//
// router.post("/post", function(req, res){
//     req.body.author = req.user._id; // 2
//     PlannerPost.create(req.body, function(err, post){
//         if(err){
//             req.flash("post", req.body);
//             req.flash("errors", util.parseError(err));
//             return res.redirect("/posts/new");
//         }
//         res.redirect("/posts");
//     });
// });
// router.get("/post/:id", function(req, res){
//
//     PlannerPost.findOne({_id:req.params.id}) // 3
//         .populate("author")               // 3
//         .exec(function(err, post){        // 3
//             if(err) return res.json(err);
//             res.render("posts/show", {post:post});
//         });
// });
router.get('/mypage',function (req,res) {
    Planner.find({},function(err,post){
        res.redirect('/post/'+req.user.id);
    })
});

router.get('/post',function(req,res){
    res.render('write',{title:'게시글작성'});
});

router.post('/mypage/write', upload.single('editImg'),function(req,res, next){
// 마이페이지에서 프로필 수정할 때. 이미지도 수정가능하게 바꿈.
// 이미지 입력안하면 기본사진으로 들어감.
// 프로필 수정할때마다 upload_profile에 하나씩 넣음.
    var paramintroduce=req.body.introduce;
    var paramlocation=req.body.location;
    var fileObj; //multer 모듈로 req.files
    var paramorgFileName;// 원본 파일명 저장(originalname은 fileObj의 속성)
    var paramsaveFileName;//저장된 파일명
    var parampath;

    console.log('여기여기여기여기여기여기')
    // 이미지가 있다면,
    if(req.file){
        fileObj = req.file
        paramorgFileName=fileObj.originalname;// 원본 파일명 저장(originalname은 fileObj의 속성)
        paramsaveFileName=fileObj.filename;//저장된 파일명
        parampath=fileObj.path;
    }

    // 이미지가 입력되지 않으면, 기본 프로필 사진으로 하자.
    // upload_profile에서 default_profile.jpg 지우면 안됨!!!!!
    else{
        paramorgFileName = "";
        paramsaveFileName = "";
        parampath= "upload_profile/default_profile.jpg";
    }

    var plannerpost =new Planner({"location":paramlocation,"introduce":paramintroduce});
    var userid=req.user.id;
    console.log(userid);
    Planner.findOneAndUpdate({id:req.user.id},{$set:{"location":paramlocation,"introduce":paramintroduce, "orgFileName": paramorgFileName,
        "saveFileName": paramsaveFileName, "path":parampath}},function (err,post) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        console.log("update data");
        res.redirect('/post/'+req.user.id);
    });
});

router.get('/post/write', function(req,res){
    var post=new Post();
    PlannerPost.findOne({_id:req.params.id},function(err,post){
        res.render('post',{title:'post',post:post});
    })
});
router.get('/post/:id', function (req, res) {
    if(req.params.id==null){
        res.redirect("/");
    }
    else{
        if(req.params.id=="popup"){
            console.log("id popup 호출:");
            res.redirect('/popup');
        }
        Planner.findOne({id:req.params.id}, function (err, post) {

            res.render('plannerpage', { title: 'Post', user_info: post ,
                    PostID: " ",
                    PostName: " ",
                    PostTitle: " ",
                    PostCategory: " ",
                    PostLocation: " ",
                    PostContents: " ",
                    PostPath: " ",
                });
        })
    }
});

module.exports = router;