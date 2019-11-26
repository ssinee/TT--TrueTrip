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
    location: String,
    path:String,//프로필 사진 경로
    introduce: String,
});
//
// {"id":id, "pw":pw, "name":paramName,"email":paramEmail,
//     "category1":paramCategory1,"category2": paramCategory2,"category3":paramCategory3, "location": location, "path": profileImg}
module.exports= mongoose.model('planners', PlannerSchema, 'planners');