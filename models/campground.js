// Establishes Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", {
    useMongoClient: true
});

// Fixes potential errors introduced in Mongoose 4.11.0
mongoose.Promise = global.Promise;

// Creates Campground Schema
var campgroundSchema = new mongoose.Schema({
    author: {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);