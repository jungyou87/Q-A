var mongoose = require ('mongoose')
var User = mongoose.model('User')

module.exports = {
    login : function (req, res){
        // console.log('from server',req.body)
        User.findOne({ name : req.body.name }, function(err, user){
            if (err){
                return res.json(err)
            }
            else if (!user){
                User.create(req.body, function(err, user){
                    if (err){
                        console.log(err)
                        return res.json(err)
                    }
                    console.log('from creating',user)
                    return res.json(user)
                })
            }
            else{
                console.log('from exising',user)
                return res.json(user)
            }
        })
    }
}