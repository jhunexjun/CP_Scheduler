const utils = require('../utils/util');
const scheduleModel = require("../models/scheduleModel");

let resData;

module.exports = async function(req, res) {
	try {
		switch(req.method) {
			case 'GET':
				let errMsg = ' param is missing';

				if (req.query.dateRange === undefined || req.query.dateRange === null) {
					res.json({status: 'Error', message: 'dateRange' + errMsg});
					return;
				}

				if (req.query.technicianIds === undefined || req.query.technicianIds === null) {
					res.json({status: 'Error', message: 'technicianIds' + errMsg});
					return;
				}

				if (req.query.dateRange === 'custom') {
					if (req.query.utcDateFrom === undefined || req.query.utcDateFrom === null) {
						res.json({ status: 'Error', message: 'utcDateFrom' + errMsg });
						return;
					}
					if (req.query.utcDateTo === undefined || req.query.utcDateTo === null) {
						res.json({ status: 'Error', message: 'utcDateTo' + errMsg });
						return;
					}
				}

				const scheds = await scheduleModel.getScheduleAsync(req);

				if (scheds.data.length > 0 && scheds.data[0].hasOwnProperty('errorNo'))
					resData = { status: "Error", message: scheds.data[0].errMsg, data: [] };
				else
					resData = { status: "OK", data: scheds.data }

				res.json(resData);
				break;
			case 'POST':
				resData = await addSchedule(req);
				res.json(resData);
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

// async function getSchedules(req) {
// 	return scheduleModel.getSchedule(req);
// }

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
	if (req.body.subject === undefined || !req.body.subject)
		return { status: 'Error', message: 'subject param is missing.' };
	if (req.body.utcDateFrom === undefined || !req.body.utcDateFrom)
		return { status: 'Error', message: 'utcDateFrom is missing.' };
	if (req.body.utcDateTo === undefined || !req.body.utcDateTo)
		return { status: 'Error', message: 'utcDateTo is missing.' };

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