var express = require('express'),
	app = express(),
	port = process.env.PORT || 8008;

// Setting the view engine
app.use(express.static('views'));
app.set('view engine', 'ejs');

// Rendering index ejs template
app.get('/', function(req, resp){
	resp.render('index');
});

// Making the express listening at the port specified
app.listen(port, function(req, resp){
	console.log("Server listing on port",port);
});