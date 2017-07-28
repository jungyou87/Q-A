var mongoose = require('mongoose')

//Schemas
var AnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, 'Answer cannot be blank'],
        minlength: [5, 'Answer must be greater than 5 characters']
    },
    details: {
        type: String,
    },

    likes: {
        type: Number,
        default : 0
    },
    _user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    _question : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },

});


// Register
mongoose.model('Answer', AnswerSchema);