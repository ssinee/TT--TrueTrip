var mongoose=require("mongoose")
var Schema=mongoose.Schema


var RequestSchema= new Schema({

    planner:String,
    author: String,
    selectpost: [String],
    date: String,
    start: String,
    end: String,
    people: String,
    age: String,
    car: String,
    yes_info: [String],
    no_info: [String],
    addition: String,
    confirm: { type: Boolean, default: false}

});


module.exports= mongoose.model('requests', RequestSchema,'requests');