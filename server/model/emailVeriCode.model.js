/*
This mongoose model is used to store user's email verification code and its time info
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailCodeSchema = new Schema({
	code: String,
	email: {
		type: String,
		index: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: Date
});

module.exports = mongoose.model('Email', EmailCodeSchema);

