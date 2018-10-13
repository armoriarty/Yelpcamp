// Establishes Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", {
    useMongoClient: true
});

// Fixes potential errors introduced in Mongoose 4.11.0
mongoose.Promise = global.Promise;

var passportLocalMongoose = require("passport-local-mongoose");

// Creates Campground Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

// Exports User Model
module.exports = mongoose.model("User", UserSchema);