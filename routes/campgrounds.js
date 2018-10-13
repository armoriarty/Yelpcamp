// Enables JavaScript strict mode
"use strict";

var express = require("express");
var router = express.Router();

// Schema settings
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

// Campgrounds Page - Index Route
router.get("/", function (req, res) {
    // Get all campgrounds .db
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// Create Route
router.post("/", isLoggedIn, function (req, res) {
    Campground.create(req.body.campground, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // associate user with campground
            campground.author.id = req.user.id;
            campground.author.username = req.user.username;
            //save campground
            campground.save();
            res.redirect("/campgrounds");
        }
    });
});

// New Route
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// Show Route
router.get("/:id", function (req, res) {
    // Find the campground with the matching ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            // Render show page template with data
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

// Edit Route
router.get("/:id/edit", checkCampgroundOwnership, function (req, res, next) {
    Campground.findById(req.params.id, function (err, campgrounds) {
        res.render("campgrounds/edit", {campgrounds: campgrounds});
    });
});

// Update Route
router.put("/:id", checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            // redirect to show page of that website
            res.redirect(req.params.id);
        }
    });
});

//Delete Route
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
});

// Function Checks if User is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campgrounds) {
            if (err) {
                res.redirect("back");
            } else {
                if(campgrounds.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be logged in");
        res.redirect("back");
    }

}

module.exports = router;