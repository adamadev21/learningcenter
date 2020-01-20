

var express                 =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    request                 =require("request"),
    Document                =require("./models/documents"),
    Question                =require("./models/question"),
    Response                =require("./models/responses"),
    User                    =require("./models/user"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    session                 =require("express-session"),
    methodOverride          =require("method-override");


//===========================================================//
//REQUIRE ROUTES
var responseRoutes    = require("./routes/responses"),
    questionRoutes    = require("./routes/questions"),
    documentRoutes    = require("./routes/documents"),
    userRoutes       = require("./routes/user"),
    methodOverride = require("method-override");

    mongoose.Promise = global.Promise;
    
//===========================================================//
//=====================================================//
//MONGOOSE CONFIG
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost/learning_center_db",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//USES WHAT IS REQUIRED
app.use(require("express-session")({
    secret: "What's up?",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/assets", express.static(__dirname + "/views/assets"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoutes);
app.use("/documents", documentRoutes);
app.use("/askexperts", questionRoutes);
app.use("/askexperts", responseRoutes);




port=process.env.PORT ||3000
app.listen(port,function (){
    console.log("Server has Started ...")
});