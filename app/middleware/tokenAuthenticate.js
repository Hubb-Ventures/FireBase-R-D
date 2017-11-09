let jwt = require('jsonwebtoken'),
	express = require('express'),
	body = require('body-parser');

tokenCheck = express.Router();

tokenCheck.use(function(req, res, next) {
	var token = req.headers['access-token'] || req.body.token;
	if (token) {
		jwt.verify(token, process.env.SECRET, function(err, decode) {
			if (err) {
				res.status(401).send({"msg": "Nice try! Unauthorized."});
			}
			else {
				req.user = decode.user;
				next();
			}
		})
	}
	else {
		res.status(400).send({"msg": "No token"});
	}
});

module.exports = tokenCheck;