const mongoose = require('mongoose');
const User = require('../model/user.model');
const Pickreq = require('../model/pickreq.model');
const Lodgereq = require('../model/lodgereq.model');
const Completed = require('../model/complete.model');
const CronJob = require('cron').CronJob;
const mailer = require('../mail/sendMail');
const PATH = require('path');

/*
  A Cron job to clean outdated request every 15 minute. 
*/
new CronJob(
	'0 */15 * * * *',
	function () {
		console.log('fucking myself');
		const now = new Date();
		// clean airpick request
		Pickreq.find({ arrivalTime: { $lt: now }, published: true }).exec(
			(err, docs) => {
				if (err) {
					console.log(err.stack);
				}
				const count = docs.length;
				console.log(`There are ${count} airpick requests completed`);
				docs.forEach(r => {
					let cmp = new Completed();
					cmp.requestID = r._id;
					cmp.type = 'airpick';
					cmp.username = r.username;
					cmp.volunteer = r.volunteer;
					cmp.arrivalTime = r.arrivalTime;
					cmp.airport = r.airport;
					cmp.notes = r.notes;
					cmp.save(err2 => {
						if (err2) console.error(err2.stack);
					});
					// change published to false;
					Pickreq.updateOne(
						{ _id: r._id },
						{ volunteer: '', published: false },
						(err3, ret) => {
							if (err3) {
								console.error(err3.stack);
							}
							console.log(`cleared ${ret.n} airpick records`);
						}
					);
				});
			}
		);

		// clean lodging request
		Lodgereq.find({ leaveDate: { $lt: now }, published: true }).exec(
			(err, docs) => {
				if (err) {
					console.log(err.stack);
				}
				const count = docs.length;
				console.log(`There are ${count} lodging requests completed`);
				docs.forEach(r => {
					let complete = new Completed();
					complete.requestID = r._id;
					complete.type = 'lodge';
					complete.username = r.username;
					complete.volunteer = r.volunteer;
					complete.arrivalTime = r.startDate;
					complete.notes = r.notes;
					complete.save(err2 => {
						if (err2) console.error(err2.stack);
					});
					// change published to false
					Lodgereq.updateOne(
						{ _id: r._id }, 
						{ volunteer: '', published: false }, 
						(err3, ret) => {
							if (err3) {
								console.error(err3.stack);
							}
							console.log(`cleared ${ret.n} lodging records`);
						}
					);
				});
			}
		);
	},
	null,
	true,
	'America/New_York'
);

module.exports = router => {
	//middleware to search requester info
	router.param('username', (req, res, next, username) => {
		req.username = username;
		// console.log('middleware get username:', req.username);
		next();
	});

	// middleware to get the requestId param
	router.param('requestId', (req, res, next, requestId) => {
		req.requestId = requestId;
		return next();
	});

	// middleware to get volunteer username
	router.param('volunteer', (req, res, next, volunteer) => {
		req.volunteer = volunteer;
		return next();
	});

	// middleware to parse the requestId that to be cancelled by volunteer
	router.param('cancelId', (req, res, next, cancelId) => {
		req.cancelId = cancelId;
		return next();
	});

	// volunteer cancel a request
	router.route('/cancel/:cancelId').put((req, res) => {
		console.log('gonna cancel the volunteer in req ', req.cancelId);
		Pickreq.updateOne({ _id: req.cancelId }, { volunteer: '' }, (err) => {
			if (err) {
				return res.json({
					code: 1,
					msg: 'Cancel failed!'
				});
			}
			return res.json({
				code: 0,
				msg: 'Cancel successfully!'
			});
		});
	});
	// get current user's request
	router.route('/user/:username')
		.get((req, res) => {
			Pickreq.find({ username: req.username }, null, { lean: true }).exec(async (err, docs) => {
				if (err) {
					console.log(err.stack);
					return res.json({
						code: 1,
						msg: err.errmsg,
					});
				}
				
				const ret = await Promise.all(docs.map(async (doc) => {
					let volunteerInfo = null;
					if (doc.volunteer !== '') {
						volunteerInfo = await User.findOne({ username: doc.volunteer });
					}
					return { ...doc, volunteer: volunteerInfo };
				}));
				
				return res.json({
					code: 0,
					msg: 'Get current requests successfully',
					data: ret,
				});
			});
		})
		// Add new request
		.post((req, res) => {
			console.log('new request added\n', req.body);
			const airpickRequest = new Pickreq({ ...req.body, username: req.username });
			airpickRequest.save(async (err) => {
				if (err) {
					console.log(err.stack);
					return res.json({
						code: 1,
						msg: err.errmsg,
					});
				}
				Pickreq.find({ username: req.username }).exec((err1, docs) => {
					if (err1) {
						console.log(err1.stack);
						return res.json({
							code: 1,
							msg: err1.errmsg,
						});
					} else {
						return res.json({
							code: 0,
							msg: 'Add new request successfully!',
							data: docs,
						});
					}
				});
			});
		})
		// Update existing request
		.put((req, res) => {
			if (req.body) {
				const reqId = req.body.reqId;
				const updatedRequestContent = req.body.request;
				Pickreq.findOneAndUpdate(
					{ _id: mongoose.Types.ObjectId(reqId) },
					{ $set: updatedRequestContent },
					{ new: false },
					(err, doc) => {
						if (err) {
							console.log(err.stack);
							return res.json({
								code: 1,
								msg: err.errmsg,
							});
						}
						Pickreq.find({ username: req.username })
							.exec((err1, docs) => {
								if (err1) {
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

	router
		.route('/request/:requestId')
		.post((req, res) => {
			// A volunteer accept the request
			const id = req.requestId;
			Pickreq.findOneAndUpdate(
				{ _id: id },
				{ volunteer: req.body.volunteer },
				async (err, doc) => {
					if (err) {
						return res.status(422).json({
							msg:
								'Internal error happened when trying to accept this request!',
							err: err
						});
					} else {
						//send acpt req email
						let requester;
						let volunteer;
						try {
							requester = await User.findOne({ username: doc.username });
							volunteer = await User.findOne({ username: req.body.volunteer });
						} catch (error) {
							console.error(err);
						}
						let infoInsert = {
							user: { firstName: requester.firstName },
							request: {
								airport: doc.airport,
								arrivalTime: doc.arrivalTime
							},
							volunteer: {
								displayName: volunteer.displayName,
								wechatId: volunteer.wechatId,
								email: volunteer.email,
								phone: volunteer.email
							}
						};

						const acpReqTplt = PATH.resolve(
							__dirname,
							'../mail/pickreqTemplate/request-accepted.html'
						);
						try {
							await res.render(acpReqTplt, infoInsert, (err1, content) => {
								if (err1) {
									console.error(err1.stack);
								}
								const recipient = requester.email;
								const subject = '[AirPick] Your Request get Accepted!';
								mailer.sendMail(recipient, subject, content);
							});
						} catch (e) {
							console.log(e.stack);
						}
						return res.status(200).json({
							msg: 'Accepted this request successfully!'
						});
					}
				}
			);
		})
		.delete((req, res) => {
			// delete a request
			const id = req.requestId;
			console.log('delete', id);
			Pickreq.findOneAndDelete({ _id: id }, async (err, doc) => {
				if (err) {
					return res.json({
						code: 1,
						msg: 'Error happened when deleting!'
					});
				}
				// notify the volunteer if there is any
				if (doc.volunteer) {
					const volunteerInfo = await User.findOne({ username: doc.volunteer }, { _id: 0, email: 1 });
					console.log(volunteerInfo);
				}
				return res.status(200).json({
					code: 0,
					msg: 'Delete successully!'
				});
			});
		});

	// list all requests in the db
	router.route('/list').get((req, res) => {
		Pickreq.find({ published: true }).exec((err, doc) => {
			if (err) {
				console.error(err);
				return res.status(422).json({
					msg: err
				});
			} else {
				const result = {
					reqList: []
				};

				if (!doc || doc.length === 0) {
					return res.status(200).json({ ...result, code: 0 });
				} else {
					// search user information based on username
					// TODO: use Redis to save the user information (username -> UserInfo)
					const promiseList = [];
					let idx = 0;
					doc.forEach(item => {
						const username = item.username;
						// if already has a volunteer, then skip it
						if (item.volunteer !== '' || item.volunteer) {
							return;
						}

						promiseList.push(
							User.findOne({ username: username })
								.then(userInfo => {
									const data = {
										key: idx,
										request: item,
										user: {
											firstName: userInfo.firstName,
											lastName: userInfo.lastName,
											email: userInfo.email,
											phone: userInfo.phone,
											wechatId: userInfo.wechatId,
											gender: userInfo.gender,
											displayName: userInfo.displayName
										}
									};

									idx++;
									result.reqList.push(data);
								})
								.catch(err1 => {
									throw new Error(err1);
								})
						);
					});

					// return all promises at once
					Promise.all(promiseList)
						.then(() => {
							res.json({ ...result, code: 0 });
						})
						.catch(err1 => {
							console.error(err1);
							return res.status(422).send({ err: err1.message });
						});
				}
			}
		});
	});

	// List all accepted requests
	router.route('/volunteer/:volunteer').get((req, res) => {
		console.log('air accpepted');
		Pickreq.find({ volunteer: req.volunteer })
			.lean()
			.exec((err, doc) => {
				if (err) {
					console.error(err.stack);
					return res.status(422).json({
						msg: 'Internal server error'
					});
				}

				const promiseList = [];
				const result = [];

				doc.forEach(item => {
					const username = item.username;

					promiseList.push(
						User.findOne({ username: username })
							.then(user => {
								const obj = {
									userInfo: user,
									acceptedReq: item
								};
								result.push(obj);
							})
							.catch(err1 => {
								throw new Error(err1);
							})
					);
				});

				return Promise.all(promiseList)
					.then(() => {
						result.sort(
							(a, b) =>
								new Date(a.acceptedReq.arrivalTime).getTime() -
								new Date(b.acceptedReq.arrivalTime).getTime()
						);
						res.json({
							msg: 'Get Accepted List Successfully',
							acceptedList: result
						});
					}) 
					.catch(err1 => {
						console.error(err1);
						return res.status(422).send({ err: err1.message });
					});
			});
	});

	return router;
};
