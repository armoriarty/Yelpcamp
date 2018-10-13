"use strict";

// Establishes Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", {
    useMongoClient: true
});

// Fixes potential errors introduced in Mongoose 4.11.0
mongoose.Promise = global.Promise;

// Require Mongoose Models
var Campground = require("./models/campground");
var Comment = require("./models/comment");

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground wipe successful");
            // Create variable for Campgound Seed Data
            var data = [
                {
                    name: "Salmon Creek",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tenting_at_Joseph_A._Citta.jpg/250px-Tenting_at_Joseph_A._Citta.jpg",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque tincidunt felis id facilisis. Nulla nec maximus erat. Curabitur ut mi vel mauris aliquam ornare sagittis at elit. Proin accumsan metus nisi. Suspendisse aliquam turpis laoreet, faucibus nulla et, lacinia lacus. Duis sed ligula neque. Vivamus fermentum vestibulum lorem eu tempor. Aliquam in tincidunt enim. Quisque blandit tristique erat. Nullam purus lacus, efficitur a accumsan vitae, pellentesque in justo. Nunc at ipsum hendrerit, sodales odio eget, vulputate erat. Praesent sapien tellus, maximus sit amet nisi vitae, rhoncus bibendum leo."
                },
                {
                    name: "Granite Hill",
                    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg",
                    description: "Maecenas volutpat leo sem. Suspendisse turpis ipsum, pharetra eu ornare non, lacinia sit amet nunc. Pellentesque at magna maximus, rutrum neque nec, dapibus ipsum. Quisque id urna commodo, rhoncus orci egestas, finibus orci. Phasellus ullamcorper porttitor ante. Mauris ac egestas mi. Nunc sed tortor at eros mattis tincidunt. Pellentesque ac diam ornare, rutrum libero vel, aliquet quam. Vestibulum finibus commodo velit ut faucibus. Morbi dolor erat, consectetur sit amet suscipit nec, posuere et mi. Nullam nec tincidunt justo. Nulla porttitor sit amet quam eget imperdiet. Aliquam vel lacinia massa.g"
                },
                {
                    name: "Mountain Goat's Rest",
                    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Camping_Flumet_F.jpg",
                    description: "Fusce finibus pulvinar erat at maximus. Praesent lectus massa, suscipit sit amet ex nec, lobortis semper nunc. Maecenas ultrices mauris sollicitudin libero vehicula tempor. Quisque rhoncus at enim faucibus semper. Nam non tortor vitae urna cursus tempor vitae vestibulum urna. Mauris mattis scelerisque consectetur. Nullam rutrum, sem quis vestibulum semper, ante dui auctor ante, ac consequat mauris odio ac nibh. Vivamus ac massa varius, lobortis enim id, ornare tortor. Vestibulum pharetra sit amet metus tempus varius."
                }
            ];
            // forEach loop to implement seed campground data
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Seed Campground Added");
                        //Create Seed Comments
                        Comment.create(
                            {
                                text: "Great place but missing internet",
                                author: "Homer"
                            },
                            function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comment Created");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;