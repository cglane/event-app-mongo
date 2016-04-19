var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var messageSchema = new Schema({
  body:{type:String},
  time:{type:Date}
})
var EventSchema = new Schema({
    eventTitle: { type: String, required: true},
    users:[{type:[Schema.Types.ObjectId],index:1}],
    admins:[{type:[Schema.Types.ObjectId],index:1}],
    date: { type: Date, default:Date.now},
    location:{
      city:{type:String},
      state:{type:String},
      zip:{type:String}
    },
    avatar:{type:String,default:'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'},
    eventDates:[{type:[Schema.Types.ObjectId],index:1}],
    messages:[messageSchema]

});
module.exports = mongoose.model('Events', EventSchema);
