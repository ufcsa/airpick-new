const sendMail = require('../mail/sendMail');

module.exports = router => {
	router.route('/sendPickMail').get((req, res) => {
		const target = 'ufcsaairpick@gmail.com';
		sendMail(target, 'request', 'mmm');
		return res.send('Success');
	});

	return router;
};
