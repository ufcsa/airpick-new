const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LodgereqSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
	startDate: {
		type: Date,
		required: 'Start date cannot be empty',
	},
	leaveDate: {
		type: Date,
		required: 'Leave date cannot be empty',
	},
	username: {
		type: String,
		index: true,
		required: 'Username cannot be empty',
	},
	volunteer: {
		type: String,
		default: '',
	},
	pickupLocation: {
		type: String,
		required: 'Pickup locaiton cannot be empty',
	},
	published: {
		type: Boolean,
		default: true,
	},
	notes: {
		type: String,
		default: '',
	}
});

module.exports = mongoose.model('Lodgereq', LodgereqSchema);
