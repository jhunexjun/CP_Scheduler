const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const locationModel = require("../models/locationModel");


module.exports = async function(req, res) {
	try {
		if (!utils.isSet(req.params, 'sessionId')) {
			res.json({ status: "Error" , message: "session id is missing." });
			return;
		}

		let location = await locationModel.getLocation(req);

		if (!isSetScalar(location.locationId)) {
			res.json({ status: "Error", message: 'No location found with the session.' });
			return;
		}

		res.json({ status: "OK", data: location });
	} catch(e) {
		console.log("Error in locationRoute: ", e);
	}
}

function isSetScalar(param) {
	if (param === undefined || param === null || param === "")
		return false;
	else
		return true;
}