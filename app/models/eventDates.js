var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model

var EventDateSchema = new Schema({
    title: { type: String, required: true},
    date: { type: Date, default:Date.now },
		text:{
      bool:{type:Boolean,required:true},
      time:{type:Number,required:true,default:1800000}
    },
    email:{
      bool:{type:Boolean,required:true},
      time:{type:Number,required:true,default:1800000}
    }
});
module.exports = mongoose.model('EventDate', EventDateSchema);
