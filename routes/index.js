const express = require('express');
const router = express.Router();
const fs = require('fs');

const mongoose = require('mongoose');


// Main Page
//req=클라이언트에서 전달된 데이터와 정보
//res 클라이언트에게 응답을 위한 정보
router.get('/', (req, res) => {
    res.render('../views/index');
});
router.get('/main', (req, res) => {
    res.render('../views/index');
});

router.post('/main', (req, res) => {
    res.render('../views/index');
});

//위에 탭 때문에 지움.
// router.get('/reservation_planner', (req,res)=>{
//     res.render('../views/reservation_planner.ejs')
// })
// router.get('/reservation_user', (req,res)=>{
//     res.render('../views/reservation_user.ejs')
// })

router.get('/lists', (req,res)=>{
    var theme= req.body.theme;
    var dbdata=mongoose.model('PostData');
    dbdata.find({}, function(err, data){
        if(err) res.send(err);
        else {
            res.render('../views/listings.ejs',{'data': data})
        }
    }).select('-_id')
})

router.get('/guide', (req, res)=>{
    res.render('../views/guidepage_traveler')
})

router.get('/upload', (req, res)=>{
    res.render('../views/image_upload.ejs');
})


router.get('/reqForm', (req,res)=>{
    res.render('../views/RequestForm.ejs');
})


router.get('/testguide', (req, res)=>{
    res.render('../views/guidepage_test.ejs')
})
router.get('/plannerRegister', (req,res)=>{
    res.render('../views/plannerRegister.ejs')
})

module.exports = router;
