let express = require("express"),
	fileCheck = express.Router();

let Files = require('../db/models/files'),
	Users = require('../db/models/users');

fileCheck.use(function(req, res, next) {
	console.log("middleware", req.body);
	let fid = req.headers['fid'] || req.body.fid;
	let uid = req.headers['access-id'] || req.body.uid;
	if( fid !== undefined) {
		Files.findById(fid, function(err, file) {
			if(err) {
				console.log(err);
				res.status(400).send({"msg": "No file for the given file ID."});
			}
			else {
				// TODO: handle error in case no file turns up
				if( file.userId == uid ) {
					next();
				}
				else {
					res.status(401).send({"msg": "That file doesn't belong to you."});
				}
			}
		});
	}
	else if( req.method === 'OPTIONS') {
		res.status(200).send("connected");
	}
	else {
		res.status(400).send({"msg": "No file id."});
	}
});

module.exports = fileCheck;