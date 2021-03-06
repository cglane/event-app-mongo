// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// // set up a mongoose model
// module.exports = mongoose.model('User', new Schema({
// 	name: String,
// 	password: String,
// 	admin: Boolean
// }));

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

    //saving events that user is a part of
var subEventSchema = new Schema({
    eventId:{type:Schema.Types.ObjectId},
    admin:{type:Boolean,default:false},
    eventTitle:{type:String}
})
  //main user schema
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName:{type:String,default:''},
    lastName:{type:String,default:''},
		email:{type:String,default:''},
    phone:{type:String,default:''},
    events:[subEventSchema],
    avatar:{type:String}
});

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
