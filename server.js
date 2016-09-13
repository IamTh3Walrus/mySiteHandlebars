//Requires the various node modules used with the app.
var express = require('express');

var app = express();

//Connect to MongoBD to recieve email messages.
var mongo = require('Mongodb');

//Blocks header from containing information about the server.
app.disable('x-powered-by');

//Defines handlebars as our main layout.
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Body-Parser allows us to use the post method in the contact form.
app.use(require('body-parser').urlencoded({
    extended: true
}));

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

//Defines that the app is going to be run on port 3000.
app.set('port', process.env.PORT || 3000);

//Allows access to public directory.
app.use(express.static(__dirname + '/public'));

//Define routes. Req = request to http. Res = response that is sent back.
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/portfolio', function(req, res) {
    res.render('portfolio');
});

app.get('/contact', function(req, res) {
    res.render('contact', {
    csrf: 'CSRF token here'});
});

app.get('/thankyou', function(req, res) {
    res.render('thankyou');
});

app.post('/process', function(req, res){
  console.log('Form : ' + req.query.form);
  console.log('CSRF token : ' + req.body._csrf);
  console.log('Email : ' + req.body.email);
  console.log('Message : ' + req.body.ques);
  res.redirect(303, '/thankyou');
});

//Tells the app to listen to the port.
app.listen(app.get('port'), function() {
    console.log('Express started');
});
