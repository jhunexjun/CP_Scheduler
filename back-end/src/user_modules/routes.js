const multer = require('multer');
const cors = require('cors');

const storage = multer.memoryStorage();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage });

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
	app.use('/admin', upload.single('workorderPdf'), checkSessionIdMw, adminRoute(app));	// workorderPdf should eq body param workorderPdf.
	app.post('/sms', smsRoute);	// Twilio webhook.
}