var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
var QuestionSchema= new mongoose.Schema({
    title:String,
    text:String
});

QuestionSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Question",QuestionSchema)