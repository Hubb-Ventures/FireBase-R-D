let Users = require('../db/models/users');

let jwt = require('jsonwebtoken');

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
					var token = jwt.sign(response,process.env.SECRET);
					response.token = token;
					delete response.user.password;
					res.status(200).send({"uid":response.user._id});
				}
				else {
					res.status(401).send({"msg": "Invalid details."});
				}
			}
			else {
				res.status(401).send({"msg": "Invalid details."});
			}
		})
	}
}