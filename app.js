var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    // Comment     = require("./models/comments")

const port = process.env.PORT || 3000;

//REQUIRING ROUTES    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://root:yelpman0s@ds033744.mlab.com:33744/man0s-yelpcamp",{ useMongoClient: true });
mongoose.Promise = global.Promise;



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "JLi^9I4@Mu^uTTZCi2!1V6p8Cr%73m3Z",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport authenticate middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); //to move to next middleware
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Listen
app.listen(port, () => {
    console.log('YelpClone app is running on http://localhost:' + port);
});
