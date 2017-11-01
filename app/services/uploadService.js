let upload = require('../middleware/upload');

let Files = require('../db/models/files'),
	Users = require('../db/models/users');

module.exports.upload = function(req, res) {
	let file = new Files();
	file.fileName = req.file.originalname;
	file.data = req.file.buffer;
	file.uploadedAt = Date.now();

	console.log(req.body);

	Users.findById(req.body.uid, function(err, user) {
		if (req.body.uid != undefined) {
			if(err){
				console.log(err);
				res.status(400).send({"msg": "No user for given credentials."});
			}
			else {
				file.userId = user._id;
				file.save(function(err, file) {
					if(err) {
						console.log(err);
						res.status(500).send({"msg": "Error saving file to the database."});
					}
					else {
						res.status(200).send({"fid": file._id})
					}
				});
			}
		}
		else {
			res.status(400).send({"msg": "Provide a user id please."});
		}
	});
}