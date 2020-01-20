var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
var ResponseSchema= new mongoose.Schema({
    text:String
});

ResponseSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Response",ResponseSchema)