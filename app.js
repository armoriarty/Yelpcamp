// Enables JavaScript strict mode
"use strict";

// Establish Node Modules
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var requestapp = require("request");
var methodOverride = require("method-override");


// Requiring Routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

// Establishes Mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
    useMongoClient: true
});

// Fixes potential errors introduced in Mongoose 4.11.0
mongoose.Promise = global.Promise;

// establishes express
var app = express();

app.use(require("express-session")({
    secret: "Rusty is the Best",
    resave: false,
    saveUninitialized: false
}));

// Tells express to use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Directs server to the public folder for css and javascript elements
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

// #######################
//        Database
// #######################


// Schema settings
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

// var seedDB = require("./seeds");

// seedDB();


// #######################
//   User Authentication
// #######################


// Tells express to use Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// #######################
//         Routes
// #######################

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// ### General use Routes ###

// 404 Page (Needs to be second to last)
app.get("*", function (req, res) {
    res.render("404page");
});

// Listening App (Needs to be last)
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("YelpCamp Server has started");
});