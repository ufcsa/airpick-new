const mongoose = require('mongoose');
const User = require('../model/user.model');
const Lodgereq = require('../model/lodgereq.model');
const mailer = require('../mail/sendMail');
const PATH = require('path');

module.exports = router => {
	router.route('/user/:username')
		.get((req, res) => {
			console.log('getting current user\'s lodge info', req.currRequest);
			Lodgereq.find({username: req.username}).exec((err, doc) => {
				if (err) {
					console.log(err.stack);
					return res.json({
						code: 1,
						msg: err.errmsg,
					});
				}
				console.log('current requests,', doc);
				return res.json({
					code: 0,
					msg: 'Get current requests successfully',
					data: doc,
				});
			});
		})
		// Add new request
		.post((req, res) => {
			console.log(req.body);
			const lodgeRequest = new Lodgereq({...req.body, username: req.username});
			lodgeRequest.save(async (err) => {
				if(err) {
					console.log(err.stack);
					return res.json({
						code: 1,
						msg: err.errmsg,
					});
				}
				Lodgereq.find({username: req.username}).exec((err1, docs) => {
					if(err1) {
						console.log(err1.stack);
						return res.json({
							code: 1,
							msg: err1.errmsg,
						});
					} else {
						return res.json({
							code: 0,
							msg: 'Add new lodge request successfully!',
							data: docs,
						});
					}
				});
			});
		})
	return router;
};
