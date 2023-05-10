const cors = require('cors');

const adminRoute = require('./routes/adminRoute');
const createSessionRoute = require('./routes/createSessionRoute');
const checkSessionIdMw = require('./routes/checkSessionIdMiddleware');
const smsRoute = require('./routes/smsRoute');


module.exports = function(app) {
	// let corsOptions = {
	// 	//origin: "http://", // to be configured later on.
	// };

	app.use(cors());
	app.use('/createsession', createSessionRoute);
	app.use('/admin', checkSessionIdMw, adminRoute(app));
	app.post('/sms', smsRoute);
}