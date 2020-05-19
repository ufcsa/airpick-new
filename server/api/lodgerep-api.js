const mongoose = require('mongoose');
const User = require('../model/user.model');
const Lodgereq = require('../model/lodgereq.model');
const mailer = require('../mail/sendMail');
const PATH = require('path');

module.exports = router => {
	return router;
};
