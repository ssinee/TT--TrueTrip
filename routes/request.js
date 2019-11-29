var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var postdata=mongoose.model('PostData')

let content_id;

router.get('/mypage',function (req,res) {
    Planner.find({},function(err,post){
        res.redirect('/post/'+req.user.id);
    })
});

router.post('/request', function(req,res){
    content_id= req.body.ids;
    console.log('/request 호출됨');
    console.log(content_id);
    res.render("../views/RequestForm.ejs");

});
router.get('/requestform',function(req,res){

    res.render("../views/RequestForm.ejs");
})
// router.get('/request',function(req,res){
//     res.render("../views/RequestForm");
// })


module.exports = router;