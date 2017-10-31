var express = require('express'),
	app = express(),
	port = process.env.PORT || 8008,
	path = require('path');

// Setting the view engine and the path to the views
app.set('views', path.join(__dirname, '/app'));
app.use(express.static('app'));
app.set('view engine', 'ejs');

// Rendering index ejs template
app.get('/', function(req, resp){
	resp.render('index');
});

app.get('/test', function(req, resp){
	resp.render('test');
});

// Making the express listening at the port specified
app.listen(port, function(req, resp){
	console.log("Server listing on port",port);
});