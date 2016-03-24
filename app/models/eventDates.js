var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model

var EventDateSchema = new Schema({
    title: { type: String, required: true},
    date: { type: Date, default:Date.now },
		textMsg:{
      bool:{type:Boolean,required:true,defaul:true},
      time:{type:Number,required:true,default:1800000}
    },
    email:{
      bool:{type:Boolean,required:true,default:true},
      time:{type:Number,required:true,default:1800000}
    }
});
module.exports = mongoose.model('EventDate', EventDateSchema);
