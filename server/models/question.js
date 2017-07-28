var mongoose = require('mongoose')
//Schemas
var QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question cannot be blank'],
        minlength: [10, 'Question must be greater than 5 characters']
    },
    description: {
        type: String,
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref : "Answer"
    }],

});


// Register
mongoose.model('Question', QuestionSchema);