const express = require('express')
const showPlannersListRouter = express.Router()
const multer = require('multer')
const DBData = require('../models/DBData');
const bodyParser = require('body-parser')
var mongoose = require('mongoose')


//for posts collection and planner collection
const dbdata = mongoose.model('PostData');
const Planner = mongoose.model('planners');

var temp = []
var idcontent=[]
var content = [];
var location;
var category;



showPlannersListRouter.post('/showplanner', function (req, res) {
    res.send({'data': content, 'Iddata':idcontent})
})


showPlannersListRouter.post('/frommain', function (req, res) {

    //main 화면에서 사용자가 선택한 카테고리와 위치
    category = req.body.category;
    location = req.body.location;
    Planner.find({'location': location}, {'id': 1, '_id': 0}, function (err, IDdata) {
        //사용자가 선택한 장소를 기반으로 planner의 collection안에서 filter
        //filter된 id바탕으로 planner의게시글 가져옴 id 통해서
        idcontent=IDdata;
        console.log(idcontent)
        for(var i=0; i<IDdata.length; i++){
            dbdata.find({'author': IDdata[i].id}, {'_id': 0, 'path': 1}, function (err, POSTdata) {
                content.push(POSTdata)
                console.log(content[i])
            })
        }
    });
    res.send('1');
});


module.exports = showPlannersListRouter