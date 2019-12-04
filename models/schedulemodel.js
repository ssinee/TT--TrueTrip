var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var ScheduleSchema= new Schema({

    planner:String,
    traveler: String,
    originRequest: String,
    plan:[String]

});


module.exports= mongoose.model('schedules', ScheduleSchema,'schedules');