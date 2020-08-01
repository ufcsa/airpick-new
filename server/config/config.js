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
		user: 'uflcsa.airpick@gmail.com',
		clientId:
			'753259254316-8fh1o9tg2rrhs1e23h93l75hqmqmmifv.apps.googleusercontent.com',
		clientSecret: 'J7O3Mqow262BnPkg7qn71CV4',
		refreshToken:
			'1//04Vsqr7azaKErCgYIARAAGAQSNwF-L9Ir2DVCltGD-0LTXsstAaEdlpdt7fGztagyXfN7rqfED2oQgbp3oU2gOMOSZ8p6VXoJG-0'
	}
};

const config = {
	db: db,
	mailer: mailer
};

module.exports = config;
