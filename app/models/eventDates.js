var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model

var EventDateSchema = new Schema({
    title: { type: String, required: true},
    date: { type: Date, default:Date.now },
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
