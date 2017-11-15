let express = require("express"),
	fileCheck = express.Router();

let Files = require('../db/models/files'),
	Users = require('../db/models/users');

fileCheck.use(function(req, res, next) {
	let fid = req.fid;
	let uid = req.user._id;
	if( fid !== undefined) {
		Files.findById(fid, function(err, file) {
			if(err) {
				console.log(err);
				res.status(500).send({"msg": "Something is wrong, try again later."});
			}
			else {
				if(file) {
					if( file.userId == uid ) {
						next();
					}
					else {
						res.status(403).send({"msg": "That file doesn't belong to you."});
					}
				}
				else {
					res.status(404).send({"msg": "No file with the given file ID."})
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