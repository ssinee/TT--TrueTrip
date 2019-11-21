var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {

    var user_type =req.body.temp1;
    // console.log(user_type);
    if(user_type=="Planner"){
        res.render('plannerRegister', { title: 'Express' });
    }
    else{
        res.render('travelerRegister', { title: 'Express' });
    }

});
module.exports = router;