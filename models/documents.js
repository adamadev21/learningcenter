var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
var DocumentSchema= new mongoose.Schema({
    title:String,
    author: String,
    url: String,
    origin: String
   
});

module.exports=mongoose.model("Document",DocumentSchema)