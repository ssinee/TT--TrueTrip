var mongoose=require("mongoose")
var Schema=mongoose.Schema


var PlannerSchema= new Schema({
    id: {type:String, required:true, unique: true},
    pw: {type:String, required:true},
    name: String,
    email: String,
    category1: String,
    category2: String,
    category3: String,
    //나중에 추가한 부분
    introduce: String,
    location: String,
    userType: { type: [String], index: "planner" }
});

module.exports= mongoose.model('planners', PlannerSchema, 'planners');