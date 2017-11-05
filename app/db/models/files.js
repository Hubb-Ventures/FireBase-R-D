let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var fileSchema = new Schema({
	userId: {
		type: ObjectId,
		required: true
	},
	fileName: {
		type: String,
		required: true
	},
	data: {
		type: Buffer,
		required: true
	},
	uploadedAt: {
		type: Date,
		required: true
	}
});

let files = module.exports = mongoose.model('files', fileSchema);