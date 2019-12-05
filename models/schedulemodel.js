var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var ScheduleSchema= new Schema({

    planner:String,
    traveler: String,
    originRequest: String,
    plan:[String],
    done: { type: Boolean, default: false},
    confirm: Boolean

});


module.exports= mongoose.model('schedules', ScheduleSchema,'schedules');