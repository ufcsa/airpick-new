const mongoose = require('mongoose');
const User = require('../model/user.model');
const Lodgereq = require('../model/lodgereq.model');
const mailer = require('../mail/sendMail');
const PATH = require('path');

module.exports = router => {
	router.route('/lodge/:username')
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
				console.log('lodge requests,', doc);
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
						console.log('one lodge entry added successfully');
						return res.json({
							code: 0,
							msg: 'Add new lodge request successfully!',
							data: docs,
						});
					}
				});
			});
		})
		// Update existing request
		.put((req, res) => {
			if (req.body) {
				console.log(req.body);
				const reqId = req.body.reqId;
				const updatedRequestContent = req.body.request;
				Lodgereq.findOneAndUpdate(
					{ _id: mongoose.Types.ObjectId(reqId) },
					{ $set: updatedRequestContent },
					{ new: false },
					(err, doc) => {
						if(err) {
							console.log(err.stack);
							return res.json({
								code: 1,
								msg: err.errmsg,
							});
						}
						console.log(doc);
						Lodgereq.find({ username: req.username })
							.exec((err1, docs) => {
								if(err1) {
									console.log(err1.stack);
									return res.json({
										code: 1,
										msg: err1.errmsg,
									});
								}
								return res.json({
									code: 0,
									msg: 'Update successfully',
									data: docs,
								});
							});
					}
				);
			}
		});
	
	router.route('/request/lodge/:requestId')
		.delete((req, res) => {
			// delete a request
			const id = req.requestId;
			console.log('delete', id);
			Lodgereq.deleteOne({ _id: id }, err => {
				if (err) {
					return res.status(422).json({
						code: 1,
						msg: 'Error happened when deleting!'
					});
				}

				return res.status(200).json({
					code: 0,
					msg: 'Delete successully!'
				});
			});
		});
	
	return router;
};
