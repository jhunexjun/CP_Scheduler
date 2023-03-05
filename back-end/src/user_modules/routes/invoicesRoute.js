const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const invoicesModel = require("../models/invoicesModel");


module.exports = async function(req, res) {
	try {
		// if (scheds[0].hasOwnProperty('errorNo')) {
		// 	res.json({ status: "Error", message: scheds[0].errMsg, data: [] });
		// }

		let invoices = await invoicesModel.getInvoices(req);
		if (invoices[0].hasOwnProperty('errorNo'))
			res.json(invoices);	// coming from stored proc.
		else
			res.json({ status: "OK", data: invoices, });
	} catch(e) {
		console.log("Error in invoicesRoute: ", e);
	}
}