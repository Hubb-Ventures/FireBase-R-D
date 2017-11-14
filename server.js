var express = require('express'),
	app = express(),
	router = express.Router(),
	upload = require('./app/middleware/upload'),
	tokenAuth = require('./app/middleware/tokenAuthenticate'),
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
	app.use('/auth*', tokenAuth);
	app.use('/auth/upload*', upload);
	app.post('/auth/upload/file', uploadService.upload);
	app.use('/auth/file*', fileCheck);
	app.use('/auth/file/:id*', fileCheck);
	app.get('/auth/file/:fid/getheaders', fileService.getHeaders);
	app.get('/auth/file/getheaders', fileService.getHeaders);
	app.post('/auth/file/map', fileService.map);
	app.post('/auth/file/saveinvoices', invoiceService.saveInvoices);
	app.get('/auth/history', invoiceService.history);

	app.get('*', function(req, res) {
		res.sendFile(__dirname + '/public/index.html');
	});

});