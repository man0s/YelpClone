var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Spicy jalapeno bacon ipsum dolor amet buffalo frankfurter rump, turducken flank chuck venison. Sirloin beef ribs spare ribs turducken, shank picanha pork belly hamburger bresaola pork chop. Tongue t-bone hamburger sausage, tri-tip spare ribs shank prosciutto landjaeger. Buffalo swine t-bone shank meatball short loin brisket tail ribeye kielbasa biltong. Cow brisket porchetta landjaeger beef meatloaf capicola prosciutto leberkas pig tongue drumstick doner shank burgdoggen. Bacon turkey jerky ball tip. Buffalo fatback pastrami bresaola spare ribs, porchetta brisket chuck pig short loin."
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Frankfurter rump pastrami filet mignon. Biltong jerky burgdoggen corned beef, bacon flank chuck cupim. Bresaola buffalo meatball, strip steak ribeye burgdoggen beef short loin tenderloin ground round landjaeger picanha tri-tip t-bone. Kevin tail chicken, corned beef bresaola venison pork loin landjaeger sausage pig."
    },
    {
        name: "Canyon Floor",
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description: "Boudin ball tip tail corned beef cupim turducken biltong, sausage spare ribs jerky andouille. Tongue pastrami turkey cow ground round. Sausage rump ball tip pastrami, pork chop swine ham kevin turkey turducken doner shankle cow salami kielbasa. Short loin bresaola cupim turducken picanha chuck tongue rump ball tip pork loin t-bone. Flank prosciutto fatback doner ham hock, chicken capicola. Kevin strip steak andouille shoulder. Swine meatloaf buffalo capicola frankfurter."
    },
    {
        name: "Burning Man",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Ham hock swine pastrami, picanha tri-tip rump frankfurter chicken biltong. Ball tip fatback ham hock meatball buffalo beef shank alcatra. Turkey kielbasa spare ribs boudin frankfurter, ground round alcatra pork chop sausage fatback sirloin turducken. Ribeye bacon turducken, corned beef short ribs pork chop tenderloin. Ground round pork chop ribeye boudin meatball, doner turkey strip steak."
    }
];

function seedDB(){
    //Remove all campgrouds
    Campground.remove({}, function(err){
        if(err) console.log(err);
        else {
            console.log("Campgrounds have been removed!");
            //add a few campgrounds
            data.forEach(function(seed, i){
                Campground.create(seed, function(err, campground){
                    if(err) console.log(err);
                    else {
                        console.log('#' + i + " Campground added successfully!");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was WiFi",
                                author: "Chuck"
                            }, function(err, comment){
                                if(err) console.log(err);
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comment has been created!");
                                }
                            });
                    }
                });
            });

        }
    });
}

module.exports = seedDB;