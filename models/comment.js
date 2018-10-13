// Establishes Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", {
    useMongoClient: true
});

// Fixes potential errors introduced in Mongoose 4.11.0
mongoose.Promise = global.Promise;

// Creates comment schema
var commentSchema = new mongoose.Schema({
        author: {
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username: String
        },
        text: String,

});

module.exports = mongoose.model("Comment", commentSchema);