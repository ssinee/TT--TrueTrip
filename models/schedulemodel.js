var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var ScheduleSchema= new Schema({

    planner:String,
    traveler: String,
    originRequest: String,
    plan:[String],
    done: { type: Boolean, default: true},
    confirm: Boolean,
    review: { type: Boolean, default: false},

});


module.exports= mongoose.model('schedules', ScheduleSchema,'schedules');