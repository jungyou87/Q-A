var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

module.exports = {
    create : function  (req, res){
        Answer.create(req.body, function(err, answer){
            if (err){
                return res.json(err)
            }
            Question.findByIdAndUpdate(
                req.body._question ,
                { $push : { answers: answer._id }},
                { new : true}, function (err, answer){
                    if (err){
                        return res.json(err)
                    }
                    return res.json(answer)
                }
            )
        }
        
    )},
    increaseLikes : function (req, res){
        console.log(req.params.id)
        Answer.findByIdAndUpdate(
            req.params.id, 
            { $inc : { likes : 1 }},
            { new : true }, function (err, answer){
                if(err){
                    return res.json(err)
                }
                return res.json(answer)
        })
    }

}