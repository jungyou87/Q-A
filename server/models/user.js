var mongoose = require ('mongoose')

//Schemas
var UserSchema = new mongoose.Schema ({
  name: {
    type : String,
    required: [true, 'Name cannot be blank'],
  },
  
});


// Register
mongoose.model('User', UserSchema);