var mongoose=require("mongoose")
var Schema=mongoose.Schema

var UserSchema= new Schema({
    id: {type:String, required:true, unique: true},
    pw: {type:String, required:true},
    // salt:{type:String, required:true},
    name: String,
    email: String,
    userType: String, //가입 시 traveler로 들어감.
    point: {type:Number,default:1000}

})


module.exports= mongoose.model('users', UserSchema,'users');