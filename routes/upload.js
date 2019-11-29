const express=require('express')
const uploadRouter=express.Router()
const multer=require('multer')
const mongoose=require("mongoose");
const DBData=require('../models/DBData');
const Planner=mongoose.model('planners');

//multer 미들웨어 등록 -> 사진 등록시 upload 파일에 저장
let upload=multer({
    dest:'upload/'
})


uploadRouter.post('/create', upload.single('myFile'), function(req, res, next){
    var title=req.body.title//글의 title
    var fileObj=req.file//multer 모듈로 req.files
    var orgFileName=fileObj.originalname;// 원본 파일명 저장(originalname은 fileObj의 속성)
    var saveFileName=fileObj.filename;//저장된 파일명
    var location=req.body.location
    var textinput=req.body.text
    var theme=req.body.theme
    var path=fileObj.path;
    var selectTheme="";

    Planner.findOne({'id':req.user.id})
        .populate('planner')
        .exec(function(err,planner){
            if(err) return res.json(err);
            else{
                var author=planner.id;
                var name = planner.name;
                console.log(author);
                // 게시글 작성시 카테고리 라디오버튼으로 바꿈. 한 게시글당 카테고리 1개 == 한번
                // for(var i =0;i<theme.length;i++){
                    if(typeof theme=="string") selectTheme=theme;
                    else selectTheme=theme[i];
                    var obj={ "name": name,"author":author,"title": title,"location":location,"text":textinput, "theme":selectTheme, "orgFileName":orgFileName, "saveFileName":saveFileName, "path": path};
                    //DBdata 객체에 담음 (DBdata 는 moongoose의 schema를 모델화한 객체)
                    var newData=new DBData(obj);
                    newData.save(function(err){
                        if(err) throw err;
                        res.end('OK');
                    });
                // }

            }

        })
});
//기존 것 주석처리 해놓은 부분
// uploadRouter.post('/create', upload.single('myFile'), function(req, res, next){
//
//     var userID=req.body.author//글 작성자 id 가져오기
//     var title=req.body.title//글의 title
//     var fileObj=req.file//multer 모듈로 req.files
//     var orgFileName=fileObj.originalname;// 원본 파일명 저장(originalname은 fileObj의 속성)
//     var saveFileName=fileObj.filename;//저장된 파일명
//     var location=req.body.location
//     var textinput=req.body.text
//     var theme=req.body.theme
//     var path=fileObj.path;
//     var selectTheme="";
//
//
// //추출한 데이터를 object에 담음
//     for(var i =0;i<theme.length;i++){
//         if(typeof theme=="string") selectTheme=theme;
//         else selectTheme=theme[i];
//         var obj={"author": userID, "title": title,"location":location,"text":textinput, "theme":selectTheme, "orgFileName":orgFileName, "saveFileName":saveFileName, "path": path}
//         //DBdata 객체에 담음 (DBdata 는 moongoose의 schema를 모델화한 객체)
//         var newData=new DBData(obj);
//         newData.save(function(err){
//             if(err) res.send(err);
//             res.end('OK');
//         });
//     }
// });

module.exports=uploadRouter;