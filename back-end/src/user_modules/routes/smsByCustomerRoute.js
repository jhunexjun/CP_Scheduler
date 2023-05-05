const smsModel = require('../models/smsModel');

module.exports = async function(req, res) {
	const sms = await smsModel.getAllSmsByCustomer(req);

	let resData;

	if (sms.length <= 0) {
		res.json({ status: "OK", data: [] });
	} else {
		if (sms[0].hasOwnProperty('errorNo'))
			resData = { status: "Error", message: sms[0].errMsg, data: [] };
		else
			resData = { status: "OK", message: "Okay", data: sms }

		res.json(resData);
	}
}