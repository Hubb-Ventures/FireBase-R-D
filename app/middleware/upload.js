let	express = require('express'),
	path = require('path'),
	multer = require('multer'),
	Excel = require('exceljs'),
	workbook = new Excel.Workbook();

var uploadCheck = express.Router();

uploadCheck.use(function(req, res, next) {
	var storage = multer.memoryStorage();

	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname);
			if(ext !== '.xlsx' && ext !== '.csv') {
				return callback(null,false);
			}
			callback(null, true);
		}
	}).single('userFile')
	upload(req, res, function(err) {
		if(err) {
			console.log(err);
			res.status(500).send({"msg":"Internal error. Try again"});
		}
		if(req.file !== undefined) {
			next();
		}
		else {
			res.status(400).send({"msg":"The required files were not uploaded."});
		}
	});
});

module.exports = uploadCheck;