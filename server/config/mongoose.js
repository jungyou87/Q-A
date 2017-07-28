var mongoose = require('mongoose');
var fs = require('fs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meanQ&A123123', { useMongoClient: true });

var models_path = __dirname+ '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    console.log(`loading ${file}...`);
    require(models_path + '/' + file);
  }
});