const mongoose = require('mongoose');
const User = require('../model/user.model');
const Lodgereq = require('../model/lodgereq.model');
const mailer = require('../mail/sendMail');
const PATH = require('path');

module.exports = router => {
	// middleware to get volunteer username
	router.param('volunteer', (req, res, next, volunteer) => {
		req.volunteer = volunteer;
		return next();
	});

	router.param('username', (req, res, next, username) => {
		req.username = username;
		console.log('middleware get username:', req.username);
		next();
	});
	
	router.route('/lodge/list')
		.get((req,res)=>{
			const result = {
				reqList: []
			};

			Lodgereq.find({ published: true }).exec((err, doc) => {
				if (err) {
					console.error(err);
					return res.status(422).json({
						msg: err
					});
				} else {
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
								console.log({ ...result, code: 0 });
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
		.post((req, res) => {
		
			//A volunteer accept the request
			const id = req.requestId;
			Lodgereq.findOneAndUpdate(
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
						console.log('request',doc);
						let infoInsert = {
							user: { firstName: requester.firstName },
							request: {
								stateDate: doc.startDate,
								LeaveDate: doc.LeaveDate
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
							'../mail/lodgereqTemplate/request-accepted.html'
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

	//list all accepted lodge request
	router.route('/volunteer2/:volunteer').get((req, res) => {
		console.log('lodge accpeted');
		Lodgereq.find({ volunteer: req.volunteer })
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
						console.log(result);
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
