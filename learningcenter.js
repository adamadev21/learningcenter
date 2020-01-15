

var express                =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    request                 =require("request"),
   Document                 =require("./models/documents")
    Question                =require("./models/question")
   User                    =require("./models/user")
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose")



//=====================================================//
//MONGOOSE CONFIG
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost/learning_center_db",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.use(require("express-session")({
    secret: "/secret",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/assets", express.static(__dirname + "/views/assets"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
var blogSchema= new mongoose.Schema({
    name: String,
    country: String
});
var Blog= mongoose.model("Blog",blogSchema)
//ROUTES

app.get("/",function(req,res){
    res.render('home')
});

app.get('/signup',function(req,res){
    res.render("signup")
});

app.post("/signup", function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("signup")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/login");
        });
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}
app.get("/login",function(req,res){
    res.render("login")
})
app.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res){
//IT DOESNT MATTER
});
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login")
})
app.get("/elibrary", function(req,res){
    res.render("elibrary")
})
app.get("/documents", function(req,res){
    Document.find({}, function(err,documents){
        if(err){
            console.log("errer")
        }else{
            res.render("documents", {documents:documents})
        }
    });
});

app.post("/documents",function(req,res){
//create new data
Document.create(req.body.document, function(err,newDocument){
    if(err){
        res.send(err)
    }else {
       res.redirect("/documents")}
});
//redirect
   
})
app.get("/askexperts", function(req,res){
    Question.find({}, function(err,questions){
        if(err){
            console.log("errer")
        }else{
            res.render("experts", {questions:questions})
        }
    });
});
app.post("/askexperts",function(req,res){
    //create new data
    Question.create(req.body.question, function(err,newQuestion){
        if(err){
            res.send(err);
        }else {
           res.redirect("/askexperts")}
    });
    //redirect
       
    })
port=process.env.PORT ||3000
app.listen(port,function (){
    console.log("Server has Started!")
});