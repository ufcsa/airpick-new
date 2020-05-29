const User = require('../model/user.model');
const Pickreq = require('../model/pickreq.model');
const bcrypt = require('bcrypt-nodejs');
const _filter = { pwd: 0, __v: 0 };
const mailer = require('../mail/sendMail');
const PATH = require('path');
//User.deleteMany({}, () => (console.log('deleted')));

module.exports = function (router) {
	// middleware for user authentication module
	// For dev purpose. Auto remove a test account for debugging purpose
	router.use('/register', (req, res, next) => {
		User.deleteOne({ email: 'mayinghan97@gmail.com' }, (err, ret) => {
			if (err) {
				console.error(err);
				next();
			} else {
				console.log(ret);
				next();
			}
		});
	});

	router.post('/login', (req, res) => {
		const { input, pwd } = req.body;
		// console.log(input, pwd)
		User.findOne({ $or: [{ username: input }, { email: input }] }).exec(
			(err, doc) => {
				if (err) console.log(err);
				if (!doc) {
					res.send({
						code: 1,
						msg: 'cannot authenticate this user'
					});
				} else if (!doc.comparePassword(pwd.toString())) {
					res.send({
						code: 1,
						msg: 'username / password error'
					});
				} else {
					console.log('login success');
					res.cookie('userid', doc._id);
					return res.json({
						code: 0,
						msg: 'login success!',
						data: doc
					});
				}
			}
		);
	});

	router.post('/register', (req, res) => {
		let user = new User();
		const {
			email,
			firstName,
			lastName,
			pwd,
			gender,
			phone,
			wechatId,
			username,
			displayName
		} = req.body;
		user.username = username;
		user.email = email;
		user.phone = phone;
		user.firstName = firstName;
		user.lastName = lastName;
		user.displayName = displayName;
		user.wechatId = wechatId;
		user.gender = gender;

		bcrypt.hash(pwd, null, null, (_, hash) => {
			user.pwd = hash;
			user.save(async (err1, doc) => {
				if (err1) {
					console.log(err1);
					let errorMsg = err1.errmsg;
					if (err1.code === 11000) {
						errorMsg = 'Username of email already exists!';
					}
					return res.json({
						code: 1,
						msg: errorMsg
					});
				} else {
					console.log(`user ${username} saved suc`);
					const { _id } = doc;
					res.cookie('userid', _id);
					// send user reg confirm email
					const regEmailTplt = PATH.resolve(
						__dirname,
						'../mail/userTemplate/account-registration-confirm-email.template.html'
					);
					try {
						await res.render(
							regEmailTplt,
							{ firstName: firstName },
							(err, content) => {
								if (err) {
									console.error(err.stack);
								}
								const recipient = email;
								const subject = '[AirPick] Registered Successfully!';
								mailer.sendMail(recipient, subject, content);
							}
						);
					} catch (e) {
						console.error(e.stack);
					}

					return res.json({
						code: 0,
						data: {
							username,
							displayName,
							gender,
							wechatId,
							phone,
							email
						}
					});
				}
			});
		});
	});

	router.get('/info', (req, res) => {
		const { userid } = req.cookies;
		if (!userid) {
			return res.json({
				code: 1,
				msg: 'user not authorized!'
			});
		}

		// console.log(req.cookies);
		User.findOne({ _id: userid }, _filter, (err, doc) => {
			if (err) {
				return res.json({
					code: 1,
					msg: 'Internal server error'
				});
			} else if (!doc) {
				return res.json({
					code: 1,
					msg: 'No User Info!'
				});
			} else {
				return res.json({
					code: 0,
					data: doc
				});
			}
		});
	});

	// update password
	router.put('/editpassword', (req, res) => {
		const { oldPassword, newPassword, username } = req.body;
		console.log(req.body);
		User.findOne({ username: username }).exec((err, doc) => {
			if (err) {
				res.json({
					code: 1,
					msg: err
				});
				return;
			}
			if (doc.comparePassword(oldPassword)) {
				// auth successfully
				console.log('query doc', doc);
				bcrypt.hash(newPassword, null, null, async (cryptErr, passHash) =>{
					if (cryptErr) {
						res.json({
							code: 1,
							msg: cryptErr
						});
						return;
					}
					doc.pwd = passHash;
					try {
						await doc.save();	
					} catch (e) {
						console.error(e);
					}
				
					res.json({
						code: 0,
						msg: 'Update password successfully',
					});
					return;
				});
			} else {
				// auth failed
				console.log('password wrong');
				res.json({
					code: 1,
					msg: 'Old password failed to authenicate!'
				});
				return;
			}
		});
	});

	//editProfile
	router.put('/editProfile', (req, res) => {
		const id = req.body.userProfile._id;
		const updateContent = req.body.userProfile;


		User.findOneAndUpdate({ _id: id }, updateContent, async (err, oldProfile) => {
			if (err) {
				console.log('err', err);
				let errorMsg = err.errmsg;
				// the following check is unneccessary
				if (err.code === 11000) {
					errorMsg = 'Username or Email already exists!';
				}
				return res.json({
					code: 1,
					msg: errorMsg
				});
			} else {
				//email to volunteer
				if (updateContent.phone !== oldProfile.phone)
					try {
						const rqst = await Pickreq.find({ username: oldProfile.username });

						rqst.forEach((val) => {
							const volunteer = val.volunteer;
							User.findOne({ username: volunteer }, async (err1, user) => {
								if (err1) {
									console.log(err1);
								}
								const volEmail = user.email;

								const reqContactChangeTplt = PATH.resolve(__dirname, '../mail/toVolunteerTemplate/requesterContactChange.html');
								const infoInsert = {
									volunteer: { firstName: user.firstName },
									requester: { phone: updateContent.phone }
								};

								try {
									await res.render(reqContactChangeTplt, infoInsert, (err2, content) => {
										if (err2) {
											console.error(err2.stack);
										}
										console.log(content);
										const recipient = volEmail;
										const subject = '[AirPick] The Requester\' phone numebr is changed!';
										mailer.sendMail(recipient, subject, content);
									});
								} catch (e) {
									console.log(e.stack);
								}
							});
						});

					}
					catch (e) {
						console.log(e);
					}
				//
				console.log('success');
				return res.json({
					code: 0,
					data: updateContent
				});
			}
		});
	});

	return router;
};
