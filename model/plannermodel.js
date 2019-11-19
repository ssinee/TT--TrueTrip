var mongoose=require("mongoose")
var Schema=mongoose.Schema

var UserSchema= new Schema({
    id: {type:String, required:true, unique: true},
    pw: {type:String, required:true},
    // salt:{type:String, required:true},
    name: String,
    email: String
})


module.exports= mongoose.model('users', UserSchema, 'posts');