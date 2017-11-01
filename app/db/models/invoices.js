let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var invoiceSchema = new Schema({
	fileId: {
		type: ObjectId,
		required: true
	},
	invoiceNumber: {
		type: String,
		required: true
	},
	customerName: {
		type: String,
		required: true
	},
	processedAt: {
		type: Date,
		required: true
	},
	amount: {
		type: String,
		required: true
	},
	gst: {
		type: String,
		required: true
	},
	amountWGST: {
		type: String,
		required: true
	}
});

let invoices = module.exports = mongoose.model('invoices', invoiceSchema);