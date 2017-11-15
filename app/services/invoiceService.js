let	Invoices = require('../db/models/invoices'),
	Files = require('../db/models/files');

let userService = require('./userService');

let mongoose = require('mongoose'),
	Promise = require('bluebird'),
	async = require('async');

mongoose.Promise = Promise;

module.exports.saveInvoices = function(req, res) {
	let mappedInvoices = JSON.parse(req.body.Invoices);
	let count = 0;
	// mappedInvoices.forEach( function(invoice) {
	// 	let inv = new Invoices();
	// 	inv.fileId = req.fid;
	// 	inv.processedAt = Date.now();
	// 	inv.invoiceNumber = invoice.invoiceNumber;
	// 	inv.customerName = invoice.customerName;
	// 	inv.amount = invoice.amount;
	// 	inv.gst = invoice.gst;
	// 	inv.amountWGST = invoice.amountWGST;
	// 	inv.save(function(err) {
	// 		if(err) {
	// 			console.log(err);
	// 		}
	// 	});
	// });
	async.forEach(mappedInvoices, function(invoice, callback) {
		let inv = new Invoices();
		inv.fileId = req.fid;
		inv.processedAt = Date.now();
		inv.invoiceNumber = invoice.invoiceNumber;
		inv.customerName = invoice.customerName;
		inv.amount = invoice.amount;
		inv.gst = invoice.gst;
		inv.amountWGST = invoice.amountWGST;
		inv.save()
		.then(function() {
			console.log("here");
			callback();
		})
		.catch((err) => {
			count ++;
			callback();
		});
	}, (err) => {
		if(!err) {
			if((mappedInvoices.length - count) !== 0) {
				res.status(200).send({"msg": "Successfully saved "+ (mappedInvoices.length - count) +" invoice(s)."});
			}
			else {
				res.status(500).send({"msg": "Could not save any invoices due to data mismatches. Try again later."})
			}
		}
		else {
			consoe.log(err);
			res.status(500).send({"msg": "Something is wrong with the system. try again later."});
		}
	});
	// res.status(200).send({"msg": "Successfully saved "+ mappedInvoices.length +" invoices."});
}