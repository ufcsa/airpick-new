const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const emailValidator = [
	validate({
		validator: 'matches',
		arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
		message: 'Invalid email format'
	}),
	validate({
		validator: 'isLength',
		arguments: [3, 40],
		message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
	})
];

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		index: true,
		unique: true
	},
	pwd: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true,
		validate: emailValidator
	},
	phone: {
		type: String,
		default: ''
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},
	displayName: {
		type: String,
		trim: true
	},
	wechatId: {
		type: String,
		required: true,
		unique: true
	},
	gender: {
		type: String,
		default: '',
		required: true
	},
	avatar: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	volunteer: {
		type: String,
		default: ''
	}
});

UserSchema.methods.comparePassword = function (pwd) {
	return bcrypt.compareSync(pwd, this.pwd);
};

module.exports = mongoose.model('User', UserSchema);
