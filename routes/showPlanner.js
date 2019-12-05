const express = require('express')
const showPlannersListRouter = express.Router()
const multer = require('multer')
const DBData = require('../models/DBData');
const bodyParser = require('body-parser')
var mongoose = require('mongoose')

//for posts collection and planner collection
const dbdata = mongoose.model('PostData');
const Planner = mongoose.model('planners');
mongoose.Promise = global.Promise


var temp = []
var idcontent = [];
var content = [];
var proImg_content=[];
var location = "";
var category = "";


showPlannersListRouter.get('/plannerlist', function (req, res) {
    res.render('../views/plannerList.ejs', {'data': content});
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


//planner page data 전송
showPlannersListRouter.post('/showplanner', function (req, res) {
    console.log(content)
    console.log(idcontent)
    res.send({'data': content, 'Iddata': idcontent, 'location': location, 'category': category})

});

showPlannersListRouter.post('/frommain', async (req, res) => {
    idcontent = [];
    content = [];
    //main 화면에서 사용자가 선택한 카테고리와 위치
    category = req.body.category;
    location = req.body.location;
    var plannerquery="{}"
    var postquery="{}"

    if((location=="모든지역") && (category=="모든카테고리")){

        //{'location': location} planner
        // {'author': IDdata[i].id, 'theme': category} post
        await Planner.find({}, {'id': 1, 'path':1, '_id': 0}, async (err, IDdata) => {
            idcontent = IDdata;
            for (var i = 0; i < IDdata.length; i++) {
                await dbdata.find({'author':IDdata[i].id}, {
                    '_id': 0,
                    'path': 1
                }, function (err, POSTdata) {
                    content.push(POSTdata)
                })
            }
            console.log("Sdddddddddddddddd")
            console.log(content.length)
            if(content.length>0) res.send('1'); else res.send('0');
        });
        
    }else if(location=="모든지역"){

        //plannerquery null
        // post query author theme
        await Planner.find({}, {'id': 1, 'path':1, '_id': 0}, async (err, IDdata) => {
            idcontent = IDdata;
            for (var i = 0; i < IDdata.length; i++) {
                await dbdata.find({'author':IDdata[i].id,'theme': category }, {
                    '_id': 0,
                    'path': 1
                }, function (err, POSTdata) {

                    content.push(POSTdata)
                })
            }


            if(content.length>0) res.send('1'); else res.send('0');
        });
    }else if(category=="모든카테고리"){
        console.log("category all")
        await Planner.find({'location': location}, {'id': 1, 'path':1, '_id': 0}, async (err, IDdata) => {
            idcontent = IDdata;
            for (var i = 0; i < IDdata.length; i++) {
                await dbdata.find({'author':IDdata[i].id }, {
                    '_id': 0,
                    'path': 1
                }, function (err, POSTdata) {
                    content.push(POSTdata)
                })
            }
            console.log("Sdddddddddddddddd")
            console.log(content.length)
            if(content.length>0) res.send('1'); else res.send('0');
        });
    }else {
        await Planner.find({'location': location}, {'id': 1, 'path':1, '_id': 0}, async (err, IDdata) => {
            idcontent = IDdata;
            for (var i = 0; i < IDdata.length; i++) {
                await dbdata.find({'author':IDdata[i].id , 'theme': category}, {
                    '_id': 0,
                    'path': 1
                }, function (err, POSTdata) {
                    content.push(POSTdata)
                })
            }
            console.log("Sdddddddddddddddd")
            console.log(content.length)
            if(content.length>0) res.send('1'); else res.send('0');

        });

    }


});

module.exports = showPlannersListRouter