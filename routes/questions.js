var express = require("express");
var router  = express.Router();
var Question = require("../models/question");
var Comment = require("../models/responses");

//GET ALL QUESTIONS
router.get("/", function(req,res){
    Question.find({}, function(err,questions){
        res.render("experts", {questions:questions})
    })
})
//CREATE A NEW QUESTION
router.post("/",function(req,res){
    Question.create(req.body.question,function(err,newQuestion){
if (err){
    res.send(err)
}else{
    res.redirect("askexperts/")
}
    })
})
//SHOW A SPECIFIC QUESTION
router.get("/:id", function(req, res){
    //find the question with provided ID
    Question.findById(req.params.id).populate("responses").exec(function(err, questions){
        if(err){
            console.log(questions);
           
            return res.redirect('/askexperts');
        }else{
            console.log(questions)
            //render show template with that question
            res.render("show", {questions: questions});
        }
      
    });
});
//DELETE A QUESTION
router.delete("/:id", function(req,res){
    Question.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err)
        }else{
            res.redirect("/askexperts")
        }
    })
})



// // EDIT - shows edit form for a question
// router.get("/:id/edit", isLoggedIn, checkUserquestion, function(req, res){
//   //render edit template with that question
//   res.render("questions/edit", {question: req.question});
// });

// // PUT - updates question in the database
// router.put("/:id", isSafe, function(req, res){
//   geocoder.geocode(req.body.location, function (err, data) {
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var location = data.results[0].formatted_address;
//     var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
//     question.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, question){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             req.flash("success","Successfully Updated!");
//             res.redirect("/questions/" + question._id);
//         }
//     });
//   });
// });

// // DELETE - removes question and its comments from the database
// router.delete("/:id", isLoggedIn, checkUserquestion, function(req, res) {
//     Comment.remove({
//       _id: {
//         $in: req.question.comments
//       }
//     }, function(err) {
//       if(err) {
//           req.flash('error', err.message);
//           res.redirect('/');
//       } else {
//           req.question.remove(function(err) {
//             if(err) {
//                 req.flash('error', err.message);
//                 return res.redirect('/');
//             }
//             req.flash('error', 'question deleted!');
//             res.redirect('/questions');
//           });
//       }
//     })
// });

module.exports = router;