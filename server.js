let express = require('express');
let bp = require('body-parser');
let mongoose = require('mongoose');


let app = express();

app.use(express.static(__dirname+'/public/dist') );
app.use(bp.json());

require('./server/config/mongoose.js')

// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app);


app.listen(8000, function(){
  console.log("Listening on port 8000...");
});
