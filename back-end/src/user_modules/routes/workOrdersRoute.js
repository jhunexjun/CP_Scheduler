const utils = require('../utils/util');
const workOrdersModel = require("../models/workOrdersModel");


module.exports = async function(req, res) {
	try {
		// if (!utils.isSet(req.query, 'sessionId')) {
		// 	res.json({ status: "Error" , message: "session id is missing." });
		// 	return;
		// }

		let workOrders = await workOrdersModel.getWorkOrders(req);

		if (workOrders.length > 0 && workOrders[0].hasOwnProperty('errorNo'))
			res.json({ status: 'Error', message: workOrders[0].errMsg })
		else
			res.json({ status: "OK", data: workOrders, });
	} catch(e) {
		console.log("Error in workOrdersRoute: ", e);
	}
}