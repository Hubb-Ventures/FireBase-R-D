let	Invoices = require('../db/models/invoices'),
	Files = require('../db/models/files');

let userService = require('./userService');

let mongoose = require('mongoose'),
	Promise = require('bluebird'),
	async = require('async');

mongoose.Promise = Promise;

module.exports.history = function(req, res) {
	if (req.user) {
		var userInvoices = [];
		userService.getFiles(req.user._id)
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

module.exports.saveInvoices = function(req, res) {
	var mappedInvoices = JSON.parse(req.body.Invoices);
	mappedInvoices.forEach( function(invoice) {
		// console.log(invoice);
		let inv = new Invoices();
		inv.fileId = req.headers['fid'];
		inv.processedAt = Date.now();
		inv.invoiceNumber = invoice.invoiceNumber;
		inv.customerName = invoice.customerName;
		inv.amount = invoice.amount;
		inv.gst = invoice.gst;
		inv.amountWGST = invoice.amountWGST;
		inv.save(function(err) {
			if(err) {
				console.log(err);
			}
		});
	});
	res.status(200).send({"msg": "Successfully saved "+ mappedInvoices.length +" invoices."});
}