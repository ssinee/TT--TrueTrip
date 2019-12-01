var mongoose=require("mongoose")
var Schema=mongoose.Schema

var dataSchema= new Schema({
    // author: String,
    planner:{type:mongoose.Schema.Types.ObjectId, ref:"planners"},
    author:String,
    title: String,
    location:String,
    text:String,
    theme: String,
    orgFileName: String,
    saveFileName:String,
    path: String
});

var RequestSchema= new Schema({
    // id: {type:String, required:true, unique: true},
    // pw: {type:String, required:true},
    // // salt:{type:String, required:true},
    // name: String,
    // email: String,
    // userType: { type: [String], index: "traveler" }

    // user:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
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
    confirm: Boolean

});


module.exports= mongoose.model('requests', RequestSchema,'requests');