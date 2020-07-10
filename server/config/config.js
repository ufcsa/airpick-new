/**
 * todo: add profuction db uri
 */
const db =
	process.env.NODE_ENV === 'production'
		? 'mongodb+srv://yinghan:yinghan@cluster0-fvwc6.mongodb.net/airpick-prod?retryWrites=true&w=majority'
		: 'mongodb+srv://yinghan:yinghan@cluster0-fvwc6.mongodb.net/airpick-dev?retryWrites=true&w=majority';
const mailer = {
	authInfo: {
		type: 'oauth2',
		user: 'ufcsaAirPick@gmail.com',
		clientId:
			'990532027381-540b9jllvs4cqh0sr1e656ubnf8h4siu.apps.googleusercontent.com',
		clientSecret: 'YlwBYc-25YPsdYQOJTxie--K',
		refreshToken:
			'1//04RPTGN9RV3RCCgYIARAAGAQSNwF-L9IrTDgSusru4ZqoIQGtTHR9Kw6PuH1y5vgvcBxMUfbqL4t8MGQ_SojLGSMHXf0wnlPOBFY'
	}
};

const config = {
	db: db,
	mailer: mailer
};

module.exports = config;
