const technicianModel = require("../models/technicianModel");

module.exports = async function(req, res) {
	try {
		const technicians = await technicianModel.getTechnicians(req);

		if (technicians[0].hasOwnProperty('errorNo'))
			res.json({ status: "Error", message: technicians[0].errMsg, data: [] });
		else
			res.json({ status: "OK", data: technicians, });
	} catch(e) {
		console.log("Error in workerRoute: ", e);
	}
}