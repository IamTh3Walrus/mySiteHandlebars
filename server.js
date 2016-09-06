//Requires the various node modules used with the app.
var express = require('express');

var app = express();

//Blocks header from containing information about the server.
app.disable('x-powered-by');

//Defines handlebars as our main layout.
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Defines that the app is going to be run on port 3000.
app.set('port', process.env.PORT || 3000);

//Allows access to public directory.
app.use(express.static(__dirname + '/public'));

//Define routes. Req = request to http. Res = response that is sent back.
app.get('/', function(req, res){
	res.render('index');
});

app.get('/home', function(req, res){
	res.render('home');
});

app.get('/portfolio', function(req, res){
	res.render('portfolio');
});

app.get('/contact', function(req, res){
	res.render('contact');
});



//Tells the app to listen to the port.
app.listen(app.get('port'), function(){
	console.log('Express started');
});