var express = require("express");
var router = express.Router({mergeParams: true});

// Schema settings
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var User       = require("../models/user");

// Comment New Route
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {;
            // Render show page template with data
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

// Comment Create Route
router.post("/", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    // add username and id to comments
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //save comment
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            });
        }
    });
});

// Function Checks if User is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;