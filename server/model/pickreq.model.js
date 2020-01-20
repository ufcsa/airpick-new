const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PickreqSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
	airport: {
		type: String,
		trim: true,
		required: 'Airport cannot be blank'
	},
	arrivalTime: {
		type: Date,
		required: 'Arrival time cannot be blank'
	},
	carryon: {
		type: Number,
		default: 0,
		required: 'Number of carry-ons cannto be blank'
	},
	luggage: {
		type: Number,
		default: 2,
		required: 'Number of baggages cannot be blank'
	},
	username: {
		type: String,
		index: true,
		required: 'username of requester cannot be blank'
	},
	volunteer: {
		type: String,
		default: '',
		index: true
	},
	published: {
		type: Boolean,
		default: true
	},
	notes: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Pickreq', PickreqSchema);
