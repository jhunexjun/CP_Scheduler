const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const invoicesModel = require("../models/invoicesModel");


module.exports = async function(req, res) {
	try {
		let invoices = await invoicesModel.getInvoices(req);
		if (invoices.status == "Error")
			res.json(invoices);
		else
			res.json({ status: "OK", data: invoices, });
	} catch(e) {
		console.log("Error in invoicesRoute: ", e);
	}
}