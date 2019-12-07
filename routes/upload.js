const express=require('express')
const uploadRouter=express.Router()
const multer=require('multer')
const mongoose=require("mongoose");
const DBData=require('../models/DBData');
const Planner=mongoose.model('planners');

//multer 미들웨어 등록 -> 사진 등록시 upload 파일에 저장
let upload=multer({
    dest:'upload'
})

// image_upload.ejs에서 게시글 등록 시
uploadRouter.post('/create', upload.single('myFile'), function(req, res, next){
    var title=req.body.title//글의 title
    var location=req.body.location;
    var textinput=req.body.text;
    var theme=req.body.theme;
    var fileObj;
    var orgFileName;
    var saveFileName;
    var path;

    //이미지 있을 때,
    if(req.file){
        fileObj = req.file;
        orgFileName = fileObj.originalname;// 원본 파일명 저장(originalname은 fileObj의 속성)
        saveFileName = fileObj.filename;//저장된 파일명
        path = fileObj.path;
    }

    //이미지 없을 때,
    else{
        orgFileName="";
        saveFileName="";
        path = "upload/default_img.jpg"; // upload 폴더의 default_img.jpg를 게시글 기본이미지로 한다.
    }

    Planner.findOne({'id':req.user.id})
        .populate('planner')
        .exec(function(err,planner){
            if(err) return res.json(err);
            else{
                var author=planner.id;
                var name = planner.name;
                // console.log(author);
                    // 팝업 확인할 때, 이름 나올 수 있게 넣었음.
                    var obj={ "name":name, "author":author,"title": title,"location":location,"text":textinput, "theme":theme, "orgFileName":orgFileName, "saveFileName":saveFileName, "path": path};
                    //DBdata 객체에 담음 (DBdata 는 moongoose의 schema를 모델화한 객체)
                    var newData=new DBData(obj);
                    newData.save(function(err){
                        if(err) throw err;
                        res.redirect('/post/'+author)
                    });

            }

        })
});
module.exports=uploadRouter;