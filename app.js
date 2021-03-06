var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db;
console.log('Hello');
if(process.env.ENV == 'Test'){

    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}

else{
    db= mongoose.connect('mongodb://niisar:mkat123@mycluster-shard-00-00-ilpha.mongodb.net:27017,mycluster-shard-00-01-ilpha.mongodb.net:27017,mycluster-shard-00-02-ilpha.mongodb.net:27017/test?ssl=true&replicaSet=mycluster-shard-0&authSource=admin');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/books', bookRouter); 


app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;