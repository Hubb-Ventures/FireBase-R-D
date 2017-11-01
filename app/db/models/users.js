let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	joinDate: {
		type: Date,
		required: true
	}
});

let users = module.exports = mongoose.model('users', userSchema);