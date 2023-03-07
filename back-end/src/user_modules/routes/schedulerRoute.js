const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const utils = require('../utils/util');
const scheduleModel = require("../models/scheduleModel");


let resData;

module.exports = async function(req, res) {
	try {
		if (!utils.isSet(req.params, 'sessionId')) {
			res.json({ status: "Error" , message: "session id is missing." });
			return;
		}

		switch(req.method) {
			case 'POST':
				resData = await addSchedule(req);
				res.json(resData);
				break;
			case 'GET':
				const scheds = await getSchedules(req.params);
				if (scheds[0].hasOwnProperty('errorNo')) {
					res.json({ status: "Error", message: scheds[0].errMsg, data: [] });
				} else {
					resData = { status: "OK", message: "Okay", data: scheds }
					res.json(resData);
				}
				break;
			case 'PUT':
				resData = await updateSchedule(req);
				res.json(resData);
				break;
			case 'DELETE':
				resData = await deleteSchedule(req);
				res.json(resData);
				break;
			default:
				res.json({ status: 'OK', message: 'Okay' });
		}
	} catch(e) {
		console.log("Error in schedulerRouter: ", e);
	}
};

async function getSchedules(params) {
	return scheduleModel.getSchedule(params);
}

function validParams(params) {
	if (!utils.isSet(params, 'invoiceNo'))
		return { status: "Error" , message: "invoice number is missing." };
	if (!utils.isSet(params, 'technicianIds'))
		return { status: "Error" , message: "technicianIds param is missing." };
	if (params.technicianIds.length == 0)
		return { status: 'Error', message: 'No technicians found.' }

	return true;
}

async function addSchedule(req) {
	if (req.params.sessionId === undefined || !req.params.sessionId)
		return { status: 'Error', message: 'sessionId is missing.' };
	if (req.body.subject === undefined || !req.body.subject)
		return { status: 'Error', message: 'subject param is missing.' };
		// throw "subject param is missing.";
	if (req.body.utcDateFrom === undefined || !req.body.utcDateFrom)
		return { status: 'Error', message: 'utcDateFrom is missing.' };
	if (req.body.utcDateTo === undefined || !req.body.utcDateTo)
		return { status: 'Error', message: 'utcDateTo is missing.' };
	// if (!utils.isSet(req.body, "invoiceNo"))
	// 	return { status: 'Error', message: 'invoiceNo param is missing.' };
	// if (!utils.isSet(req.body, "technicianIds"))
	// 	return { status: 'Error', message: 'technicianIds param is missing. ' };
	// if (req.body.technicianIds.length == 0)
	// 	return { status: 'Error', message: 'No technicians found.' }

	const valid = validParams(req.body);
	if (valid !== true)
		return valid;

	// const params = {
	// 	subject: req.body.subject,
	// 	utcDateFrom: req.body.utcDateFrom,
	// 	utcDateTo: req.body.utcDateTo,
	// 	description: (req.body.description === undefined || req.body.description == null || req.body.description == "") ? null : req.body.description,
	// 	technicianIds: req.body.technicianIds,
	// 	invoiceNo: req.body.invoiceNo,
	// }

	return await scheduleModel.addSchedule(req);
}

async function updateSchedule(req) {
	if (req.body.id === undefined || req.body.id === null)
		return { status: "Error" , message: "sched id is missing." };

	const valid = validParams(req.body);
	if (valid !== true)
		return valid;

	return await scheduleModel.updateSchedule(req);
}

async function deleteSchedule(req) {
	if (req.body.id == undefined || !req.body.id)
		return { status: "Error" , message: "sched id is missing." };

	// const params = {
	// 	id: req.body.id,
	// }

	return await scheduleModel.deleteSchedule(req);
}