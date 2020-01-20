var express=require("express"),
    router  = express.Router(),
    Document= require("../models/documents");
  

router.get("/", function(req,res){
    Document.find({}, function(err,documents){
        if(err){
            console.log("errer")
        }else{
            res.render("documents", {documents:documents})
        }
    });
});
router.get("/new",function(req,res){
    res.render("elibrary")
})

router.post("/",function(req,res){
//create new data
Document.create(req.body.document, function(err,newDocument){
    if(err){
        res.send(err)
    }else {
       res.redirect("/documents")}
});
//redirect
   
})

module.exports = router;