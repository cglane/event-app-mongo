var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var d = new Date();
var future = new Date(d.getTime() + 10000)
var EventDateSchema = new Schema({
    title: { type: String, required: true},
    startDate: { type: Date, default:Date.now() },
    endDate:{type:Date,default: future},
		textMsg:{
      bool:{type:Boolean,default:true},
      time:{type:Number,default:1800000}
    },
    email:{
      bool:{type:Boolean,default:true},
      time:{type:Number,default:1800000}
    }
});
module.exports = mongoose.model('EventDate', EventDateSchema);
