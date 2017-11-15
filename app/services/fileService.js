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

function invoice(invoiceNumber, customerName, amount, gst, amountWGST) {
	this.invoiceNumber = invoiceNumber;
	this.customerName = customerName;
	this.amount = amount;
	this.gst = gst;
	this.amountWGST = amountWGST;
}

module.exports.getHeaders = function(req,res) {
	var promise = Files.findById(req.fid).exec();
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
	let mappedValues = [];

	var promise = Files.findById(req.fid).exec();
	promise.then(function(file) {
		workbook.xlsx.read(bufferToStream(file.data))
			.then(function() {
				var worksheet = workbook.getWorksheet(1);
				worksheet.eachRow(function(row, rowNumber) {
					if (rowNumber > 1) {
						let inv = new invoice(row.getCell(Number(req.body.invNum)).value, row.getCell(Number(req.body.cname)).value, row.getCell(Number(req.body.amt)).value, row.getCell(Number(req.body.gst)).value, row.getCell(Number(req.body.agst)).value);
						for( prop in inv) {
							console.log(inv[prop])
							if(typeof(inv[prop]) === 'object') {
								if(inv[prop].text) {
									inv[prop] = inv[prop].text;
								}
								else {
									inv[prop] = inv[prop];
								}
							}
						}
						mappedValues.push(inv);
					}
				});
				res.status(200).send(mappedValues);
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