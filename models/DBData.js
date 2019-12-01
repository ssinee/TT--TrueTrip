var mongoose=require("mongoose")
var Schema=mongoose.Schema



var dataSchema= new Schema({
    // author: String,
    planner:{type:mongoose.Schema.Types.ObjectId, ref:"planners"},
    name: String,
    author:String,
    title: String,
    location:String,
    text:String,
    theme: String,
    orgFileName: String,
    saveFileName:String,
    path: String
});
// var obj={"author": author, "title": title,"location":location,"text":textinput, "theme":theme, "orgFileName":orgFileName, "saveFileName":saveFileName, "path": path}

module.exports= mongoose.model('PostData', dataSchema, 'posts');