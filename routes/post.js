var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var Planner=mongoose.model('planners');



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

router.post('/mypage/write',function(req,res){

    var paramintroduce=req.body.introduce;
    var paramlocation=req.body.location;

    var plannerpost =new Planner({"location":paramlocation,"introduce":paramintroduce});
    var userid=req.user.id;
    console.log(userid);
    Planner.findOneAndUpdate({id:req.user.id},{$set:{"location":paramlocation,"introduce":paramintroduce}},function (err,post) {
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

            res.render('plannerpage', { title: 'Post', user_info: post });
        })
    }
});

module.exports = router;