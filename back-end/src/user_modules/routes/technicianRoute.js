const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const technicianModel = require("../models/technicianModel");


module.exports = async function(req, res) {
	try {
		const technicians = await technicianModel.getTechnicians();
		res.json({ status: "OK", data: technicians, });
	} catch(e) {
		console.log("Error in workerRoute: ", e);
	}
}