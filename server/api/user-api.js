const User = require('../model/user.model');
const bcrypt = require('bcrypt-nodejs');
const _filter = { pwd: 0, __v: 0 };
//User.deleteMany({}, () => (console.log('deleted')));

module.exports = function(router) {
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
				} else if (!doc.comparePassword(pwd)) {
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

	/**
	 * todo: finish register
	 */
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

		bcrypt.hash(pwd, null, null, (err, hash) => {
			user.pwd = hash;
			user.save((err, doc) => {
				if (err) {
					console.log(err);
					let errorMsg = err.errmsg;
					if (err.code === 11000) {
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

	return router;
};
