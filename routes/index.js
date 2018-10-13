var express = require("express");
var router = express.Router();

var passport = require("passport");

// Schema settings
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var User       = require("../models/user");

// Index Page
router.get("/", function (req, res) {
    res.redirect("/campgrounds");
});

// ### Authorization Routes ###

router.get("/signup", function (req, res) {
    res.render("user/signup");
});

router.post("/signup", function (req, res) {
    // Create new User in the DB
    User.register(new User(
        {
            username: req.body.username
        }
    ), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.render("user/signup");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            });
        }
    });
});

// ### Login Routes ###

router.get("/login", function (req, res) {
    res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    falureRedirect: "/signup"
}), function(req, res) {
});

// Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// Function Checks if User is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;