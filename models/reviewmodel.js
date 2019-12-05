var mongoose=require("mongoose")
var Schema=mongoose.Schema

var ReviewSchema= new Schema({

    author: String,
    score: String,
    comment: String,
    originRequest: String,
    state: Boolean,
    date:{type: Date, default:Date.now()}
});


module.exports= mongoose.model('reviews', ReviewSchema,'reviews');