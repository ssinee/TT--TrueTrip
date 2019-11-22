const express=require('express')
const uploadRouter=express.Router()
const multer=require('multer')
const DBData=require('../models/DBData');

//multer 미들웨어 등록
let upload=multer({
    dest:'upload/'
})

uploadRouter.get('/test', function(req,res, next){
    res.render('image_upload.html')
});

uploadRouter.post('/create', upload.single('myFile'), function(req, res, next){
    console.log(req.file)
    console.log(req.body)
    var userID=req.body.author//글 작성자 id 가져오기
    var title=req.body.title//글의 title
    var fileObj=req.file//multer 모듈로 req.files
    var orgFileName=fileObj.originalname;// 원본 파일명 저장(originalname은 fileObj의 속성)
    var saveFileName=fileObj.filename;//저장된 파일명
    var location=req.body.location
    var textinput=req.body.text
    var theme=req.body.theme
    var path=fileObj.path;

console.log(theme.length);


//추출한 데이터를 object에 담음
    for(var i =0;i<theme.length;i++){
        var obj={"author": userID, "title": title,"location":location,"text":textinput, "theme":theme[i], "orgFileName":orgFileName, "saveFileName":saveFileName, "path": path}
        //DBdata 객체에 담음 (DBdata 는 moongoose의 schema를 모델화한 객체)
        var newData=new DBData(obj);
        newData.save(function(err){
            if(err) res.send(err);
            res.end('OK');
        });
    }
});

module.exports=uploadRouter;