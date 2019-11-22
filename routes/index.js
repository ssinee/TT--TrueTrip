const express = require('express');
const router = express.Router();
const fs = require('fs');

var meanArr= new Array();
var wordArr= new Array();
var strstr= new Array();

const mongoose = require('mongoose');


// Main Page
//req=클라이언트에서 전달된 데이터와 정보
//res 클라이언트에게 응답을 위한 정보
router.get('/main', (req, res) => {
    res.render('../views/index.html');
});

router.get('/lists', (req,res)=>{
    var theme= req.body.theme;
    var dbdata=mongoose.model('PostData');
    dbdata.find({}, function(err, data){
        if(err) res.send(err);
        else {
            res.render('../views/listings.html',{'data': data})
        }
    }).select('-_id')
    // res.render('../views/listings.html')

})
router.get('/showimg', (req, res)=>{
    res.render('../views/showImg.ejs')
})

router.get('/guide', (req, res)=>{
    res.render('../views/guidepageTest.html')
})

router.get('/upload', (req, res)=>{
    res.render('../views/image_upload.html');
})


module.exports = router;
