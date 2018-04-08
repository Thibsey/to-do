var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the datebase
mongoose.connect('mongodb://Thibs:thibs@ds135179.mlab.com:35179/tododb');

// Creat a Schema. - blue print for data

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res) {
        //get data from mongodb
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });

    });

    app.post('/todo', urlencodedParser, function (req, res) {
        // get data and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;        
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};