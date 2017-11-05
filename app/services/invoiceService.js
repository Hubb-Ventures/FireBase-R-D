let	Users = require('../db/models/users');

module.exports.addLog = function(req, res) {
	let invoiceLog = new InvoiceLogs();

	invoiceLog.period = req.body.period;

	Users.find({ email: req.body.email }, function(err, users) {
		if(err) {
			console.log(err);
		}
		else {
			invoiceLog.userID = users[0]._id;
		}
	});

	Companies.find({ companyName: req.body.cname }, function(err, companies) {
		if(err) {
			console.log(err);
		}
		else {
			invoiceLog.companyID = companies[0]._id;
		}
	});

	invoiceLog.save(function(err) {
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
			res.status(200).send({"msg": "Successfully added Invoice Log."});
		}
	});
}