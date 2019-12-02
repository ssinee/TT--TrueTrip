const express = require('express')
const showPlannersListRouter = express.Router()
const multer = require('multer')
const DBData = require('../models/DBData');
const bodyParser = require('body-parser')
var mongoose = require('mongoose')

//for posts collection and planner collection
const dbdata = mongoose.model('PostData');
const Planner = mongoose.model('planners');
mongoose.Promise=global.Promise


var temp = []
var idcontent=[];
var content = [];
var location="";
var category="";


showPlannersListRouter.get('/plannerlist', function (req, res) {
    res.render('../views/plannerList.ejs', {'data':content});
})
// showPlannersListRouter.post('/showplanner', function (req, res) {
//     Planner.find({'location': location}, {'id': 1, '_id': 0}, function (err, IDdata) {
//         //사용자가 선택한 장소를 기반으로 planner의 collection안에서 filter
//         //filter된 id바탕으로 planner의게시글 가져옴 id 통해서
//         idcontent.push(IDdata);
//         console.log(idcontent)
//         for(var i=0; i<IDdata.length; i++){
//            POSTdata= dbdata.find({'author': IDdata[i].id}, {'_id': 0, 'path': 1});
//
//            content.push(POSTdata)
//             console.log(POSTdata)
//
//         }
//         res.send({'data': content, 'Iddata':idcontent})
//         idcontent=[]
//
//     });
//
//
// })




showPlannersListRouter.post('/showplanner', function(req, res){
    console.log(content)
        res.send({'data':content, 'Iddata': idcontent, 'location': location,'category': category })

});


showPlannersListRouter.post('/frommain', async (req, res)=> {
    temp=[]
    idcontent=[];
    content=[];
    //main 화면에서 사용자가 선택한 카테고리와 위치
    category = req.body.category;
    location = req.body.location;
    await Planner.find({'location': location}, {'id': 1, '_id': 0}, async (err, IDdata)=> {
        //사용자가 선택한 장소를 기반으로 planner의 collection안에서 filter
        //filter된 id바탕으로 planner의게시글 가져옴 id 통해서
        idcontent=IDdata;
        console.log(idcontent);
        for(var i=0; i<IDdata.length; i++){
            await dbdata.find({'author': IDdata[i].id}, {'_id': 0, 'path': 1}, function (err, POSTdata) {
                content.push(POSTdata)
                console.log('in for area')

            })
        }
        console.log("content")
        console.log(content)
        res.send('1');
    });

});

module.exports = showPlannersListRouter