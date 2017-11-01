var express = require('express'),
	app = express(),
	router = express.Router(),
	upload = require('./app/middleware/upload'),
	fileCheck = require('./app/middleware/fileCheck'),
	uploadService = require('./app/services/uploadService'),
	fileService = require('./app/services/fileService'),
	userService = require('./app/services/userService'),
	invoiceService = require('./app/services/invoiceService'),
	port = process.env.PORT || 3000,
	body = require("body-parser");

let mongoose = require('mongoose');

app.use(express.static('public'));

app.use(body.urlencoded({extended: true}));
app.use(body.json());

mongoose.connect(process.env.HOST, {useMongoClient: true});
let db = mongoose.connection;

db.on('error', function(err) {
	console.log("Unable to connect to MongoDB");
});

db.once('open', function() {
	console.log("Connected to DB");

	app.listen(port, function() {
		console.log('CSV app running on port '+ port);
	});

	app.post('/signup', userService.signup);
	app.post('/login', userService.login);
	app.use('/upload*', upload);
	app.post('/upload/file', uploadService.upload);
	app.use('/file*', fileCheck);
	app.get('/file/getheaders', fileService.getHeaders);
	app.post('/file/map', fileService.map);
	app.get('/file/map', fileService.sendMap);

	app.get('*', function(req, res) {
		res.sendFile('./public/index.html');
	});

});