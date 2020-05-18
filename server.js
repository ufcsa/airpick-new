const express = require('express');
const mongoose = require('mongoose');
const config = require('./server/config/config');
const app = express();
const Router = express.Router();
const hbs = require('hbs');
const userRouter = require('./server/api/user-api')(Router);
const requestRouter = require('./server/api/pickreq-api')(Router);
const lodgeRequestRouter = require('./server/api/lodgerep-api')(Router);
const mailRouter = require('./server/api/mail-api')(Router);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const server = require('http').Server(app);

const dbConfig = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
	poolSize: 5
};

const db = mongoose.connection;
db.on('disconnected', () => {
	console.log('db disconnected, tryng to reconnect...');
	mongoose.connect(config.db, dbConfig);
});
db.on('error', () => {
	console.log('db connection error, tryng to reconnect...');
	mongoose.connect(config.db, dbConfig);
});
mongoose.connect(config.db, dbConfig);

var port = process.env.PORT || 5000;

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use('/api/user', userRouter);
app.use('/api/requests', requestRouter);
app.use('/api/lodgeRequests', lodgeRequestRouter);

// for test purpose, won't use these router in production
app.use('/api/email', mailRouter);

//bound with io server+express instead of express app itself
server.listen(port, function() {
	console.log('Node app starts at port ', port);
});
