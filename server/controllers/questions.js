var mongoose = require ('mongoose')
var Question = mongoose.model('Question')

module.exports = {
    index : function (req, res){
        Question.find({}, function(err, questions) {
            if(err){
                return res.json(err)
            }
            return res.json(questions)
        })

    },
    create : function (req,res){
        Question.create(req.body, function(err, question){
            if(err){
                return res.json(err)
            }
            return res.json(question)
        })
    },
    show : function (req, res){
        Question.findById(req.params.id)
        .populate({
            path: 'answers',
            model: 'Answer',
            populate : {
                path: '_user',
                model : 'User'
            }
        })
        .exec((err, question) => {
            if(err) {
                return res.json(err)
            }
            return res.json(question)
        })
    }

}