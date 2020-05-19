const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		enum: ['airpick', 'lodge'],
		required: true,
	},
	requestID: {
		type: String,
		required: 'request Id cannot be blank'
	},
	username: {
		type: String,
		index: true,
		required: 'username cannot be blank'
	},
	volunteer: {
		type: String,
		require: 'Volunteer cannot be blank'
	},
	arrivalTime: {
		type: Date,
		required: 'Arrival time cannot be blank'
	},
	airport: {
		type: String,
		trim: true,
		default: ''
	},
	notes: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Completed', CompletedSchema);
