var mongoose=require("mongoose")
var Schema=mongoose.Schema

var PlannerSchema= new Schema({
    id: {type:String, required:true, unique: true},
    pw: {type:String, required:true},
    name: String,
    email: String,
    category1: String,
    category2: String,
    category3: String
});

module.exports= mongoose.model('planners', PlannerSchema, 'planners');