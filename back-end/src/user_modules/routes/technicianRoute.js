const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const technicianModel = require("../models/technicianModel");


module.exports = async function(req, res) {
	try {
		if (!utils.isSet(req.query, 'sessionId')) {
			res.json({ status: "Error" , message: "session id is missing." });
			return;
		}

		const technicians = await technicianModel.getTechnicians(req);

		if (technicians[0].hasOwnProperty('errorNo'))
			res.json({ status: "Error", message: technicians[0].errMsg, data: [] });
		else
			res.json({ status: "OK", data: technicians, });
	} catch(e) {
		console.log("Error in workerRoute: ", e);
	}
}