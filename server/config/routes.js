var path = require ('path');
var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');

module.exports = function (app) {
    app.post('/login', users.login);
    
    app.get('/questions', questions.index);
    app.post('/questions', questions.create);
    app.get('/questions/:id', questions.show); 

    app.post('/answers', answers.create);
    app.put('/answers/:id', answers.increaseLikes);

    app.all('*', function(req, res){
        res.sendFile(path.resolve('./public/dist/index.html'))
    })
}

