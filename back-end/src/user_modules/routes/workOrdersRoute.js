const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const workOrdersModel = require("../models/workOrdersModel");


module.exports = async function(req, res) {
	try {
		let workOrders = await workOrdersModel.getWorkOrders(req);

		if (workOrders[0].hasOwnProperty('errorNo'))
			res.json({ status: 'Error', message: workOrders[0].errMsg })
		else
			res.json({ status: "OK", data: workOrders, });
	} catch(e) {
		console.log("Error in invoicesRoute: ", e);
	}
}