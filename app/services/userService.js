let Users = require('../db/models/users'),
	Files = require('../db/models/files'),
	Invoices = require('../db/models/invoices');

let jwt = require('jsonwebtoken'),
	mongoose = require('mongoose'),
	Promise = require('bluebird'),
	async = require('async');

mongoose.Promise = Promise;

module.exports.signup = function(req, res) {
	let user = new Users();

	user.email = req.body.email;
	user.password = req.body.password;
	user.firstName = req.body.fname;
	user.lastName = req.body.lname;
	user.joinDate = new Date();

	user.save(function(err) {
		if(err){
			if(err.name === 'MongoError' && err.code === 11000) {
				return res.status(200).send({"msg":"Account exists!"});
			}
			else {
				console.log(err.message);
				return res.status(500).send({"msg": "Internal error!"});
			}
		}
		else {
			res.status(200).send({"msg": "Successfully joined."});
		}
	});
}

module.exports.login = function(req, res) {
	if (req.body.email !== undefined && req.body.password !== undefined) {
		Users.find({email: req.body.email}, function(err, users) {
			if(users.length === 1) {
				if (users[0].password === req.body.password) {
					var response = {user: users[0].toJSON()};
					var token = jwt.sign(response, process.env.SECRET, {expiresIn: '1h'});
					response.token = token;
					delete response.user;
					res.status(200).send(response);
				}
				else {
					res.status(401).send({"msg": "The password doesn't match."});
				}
			}
			else {
				res.status(401).send({"msg": "The email doesn't exist in our records."});
			}
		})
	}
}

module.exports.history = function(req, res) {
	if (req.user) {
		var userInvoices = [];
		getFiles(req.user._id)
		.then(function(files) {
			async.forEach(files, function(item, callback) {
				let invoicePromise = Invoices.find({ fileId: item._id }).exec();
				invoicePromise.then(function(invoices) {
					userInvoices = userInvoices.concat(invoices);
				})
				.then(function() {
					callback();
				});
			}, (err) => {
				if(!err) {
					res.status(200).send(userInvoices);
				}
				else {
					consoe.log(err);
					res.status(500).send({"msg": "Something is wrong with the system. try again later."});
				}
			});
		});
	}
	else {
		res.status(400).send({"msg": "No user ID was specified."});
	}
}

let getFiles = function(uid) {
	return new Promise(function(resolve, reject) {
		let promise = Files.find({ userId: uid }).exec();
		promise.then(function(files) {
			resolve(files);
		});
	});
}