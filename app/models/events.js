var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model

var EventSchema = new Schema({
    eventTitle: { type: String, required: true},
    users:{type:[Schema.Types.ObjectId],index:1},
    admins:{type:[Schema.Types.ObjectId],index:1},
    date: { type: Date, default:Date.now},
    location:{
      city:{type:String},
      state:{type:String},
      zip:{type:String}
    },
    pictures:{type:[String]},
    eventDates:{type:[Schema.Types.ObjectId],index:1}

});
module.exports = mongoose.model('Events', EventSchema);
