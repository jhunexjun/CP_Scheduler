const cors = require('cors');

const adminRoute = require('./routes/adminRoute');
const createSessionRoute = require('./routes/createSessionRoute');


module.exports = function(app) {
	// let corsOptions = {
	// 	//origin: "http://", // to be configured later on.
	// };

	app.use(cors());
	app.use('/createsession', createSessionRoute);
	app.use('/admin', adminRoute(app));
}