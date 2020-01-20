var express        =require("express"),
router         = express.Router({mergeParams: true}),
    Question       =require("../models/question"),
    Response       = require("../models/responses");

    router.get("/:id/reply",function(req,res){
        Question.findById(req.params.id).populate("responses").exec(function(err, question){
            if (err){
                res.send(err)
            }else{
                console.log(question.responses)
                res.render("responses", {question:question})
            }
        })
    })

router.get("/:id/reply/new",function(req,res){
    console.log(req.params.id)
    Question.findById(req.params.id, function(err,question){
        if(err && !req.params.id){ 
            res.send(err);
        }else {
        res.render("responses", {question:question})
    }});
    });
    router.post("/:id/reply", function(req,res){
        Question.findById(req.params.id, function(err, question){
            if (err){
                res.send(err);
            }else{
                Response.create(req.body.response, function(err, response){
                    if(err){
                        console.log(err)
                        res.redirect("/askexperts/:id")
                    }else{
                        question.responses.push(response);
                        question.save();
                        res.redirect("/askexperts/" + question._id +"/reply")
                    }
                })
            }
        })
    })
router.get("/reply", function(req,res){
    Question.findById(req.params.id, function(err,questions){
        if(err){
            res.send(err)
        }else{
            res.render("responses")
        }
    })
})

module.exports = router;