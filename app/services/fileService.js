let upload = require('../middleware/upload'),
	Files = require('../db/models/files'),
	Users = require('../db/models/users'),
	Invoices = require('../db/models/invoices');

let Excel = require('exceljs'),
	workbook = new Excel.Workbook(),
	path = require('path'),
	fs = require('fs'),
	Duplex = require('stream').Duplex,
	multer = require('multer'),
	mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

function bufferToStream(buffer) {
	let stream = new Duplex();
	stream.push(buffer);
	stream.push(null);
	return stream;
}

module.exports.getHeaders = function(req,res) {
	var promise = Files.findById(req.headers['fid']).exec();
	promise.then(function(file) {
		var array = new Array();
		workbook.xlsx.read(bufferToStream(file.data))
			.then(function() {
				var worksheet = workbook.getWorksheet(1);
				var row = worksheet.getRow(1);
				row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
					array.push(cell.value);
				});
				res.status(200).send({"headers": array});
			})
			.catch(function (err) {
				console.log(err);
				res.status(500).send({"msg": "Something is wrong with the system try again later."});
			});
	})
	.catch(err => {
		console.log(err);
	});
}

module.exports.map = function(req, res) {
	var promise = Files.findById(req.body.fid).exec();
	promise.then(function(file) {
		workbook.xlsx.read(bufferToStream(file.data))
			.then(function() {
				var worksheet = workbook.getWorksheet(1);
				worksheet.eachRow(function(row, rowNumber) {
					if (rowNumber > 1) {
						let invoice = new Invoices();
						invoice.fileId = req.body.fid;
						invoice.invoiceNumber = row.getCell(Number(req.body.invNum));
						invoice.customerName = row.getCell(Number(req.body.cname));
						invoice.processedAt = Date.now();
						invoice.amount = row.getCell(Number(req.body.amt));
						invoice.gst = row.getCell(Number(req.body.gst));
						invoice.amountWGST = row.getCell(Number(req.body.agst));
						invoice.save(function(err) {
							if(err) {
								throw err;
							}
							else {
								console.log("Invoice generated.");
							}
						})
					}
				});
				res.status(200).send({"msg": "The values have been mapped."});
			})
			.catch(function(err) {
				console.log(err);
				res.status(500).send({"msg": "Something is wrong with the system, try again later."});
			});
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({"msg": "Something is wrong with the system, try again later."})
	})
}

module.exports.sendMap = function(req, res) {
	var promise = Invoices.find({fileId: req.headers['fid']}).exec();
	promise.then(function(files) {
		res.status(200).send(files);
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({"msg": "Something is wrong with the system, try again later."})
	})
}