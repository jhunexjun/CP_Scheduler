const cors = require('cors');

const indexRoute = require('./routes/indexRoute');


module.exports = function(app) {
	// let corsOptions = {
	// 	//origin: "http://", // to be configured later on.
	// };

	app.use(cors());
	// app.use('/login', loginRoute);
	app.use('/admin', indexRoute(app));
}