const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getSchedule,
	addSchedule,
	updateSchedule,
	deleteSchedule,
}

async function getSchedule(params) {
	try {
		const sql = schedulerSql.getSchedule();
		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});

		request.addParameter('sessionId', TYPES.VarChar, params.sessionId);
		request.addParameter('technicianId', TYPES.VarChar, params.technicianId);

		const scheds = await utils.executeRequestAsync(request);

		if (scheds[0].hasOwnProperty('errorNo')) {
			return scheds;
		} else {
			let schedsGroupedById = scheds.reduce((prevValue, currentValue) => {
				const { id } = currentValue;
				let obj = prevValue.find(o => o.id === id);

				if (obj === undefined) {
					let x = {	id: id,
								subject: currentValue.subject,
								utcDateFrom: currentValue.utcDateFrom,
								utcDateTo: currentValue.utcDateTo,
								description: currentValue.description,
								technicianIds: (currentValue.technicianId == null) ? [] : [currentValue.technicianId],
								invoiceNo: currentValue.invoiceNo,	// invoice no. is mandatory.
								allDay: currentValue.allDay,
								recurrenceRule: currentValue.recurrenceRule,
							};
					prevValue.push(x);
				} else {
					obj.technicianIds.push(currentValue.technicianId);
				}

				return prevValue;
			}, []);

			return schedsGroupedById;
		}
	} catch(e) {
		throw e;
	}
}

async function addSchedule(req) {
	try {
		let sql = schedulerSql.addSchedule(
			utils.isSet(req.body, 'allDay'),
			utils.isSet(req.body, 'recurrenceRule')
		);

		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});

		request.addParameter('sessionId', TYPES.VarChar, req.params.sessionId);
		request.addParameter('subject', TYPES.NVarChar, req.body.subject);
		request.addParameter('utcDateFrom', TYPES.DateTime, req.body.utcDateFrom);
		request.addParameter('utcDateTo', TYPES.DateTime, req.body.utcDateTo);
		request.addParameter('description', TYPES.NVarChar, utils.isSet(req.body, "description") ? req.body.description : null);
		request.addParameter('invoiceNo', TYPES.NVarChar, req.body.invoiceNo);

		if (utils.isSet(req.body, 'allDay'))
			request.addParameter('allDay', TYPES.Char, 'Y');
		if (utils.isSet(req.body, 'recurrenceRule'))
			request.addParameter('recurrenceRule', TYPES.NVarChar, req.body.recurrenceRule);

		let schedId = await utils.executeRequestAsync(request);
		// console.log("schedId: ", schedId);

		req.body.id = schedId[0].newId;
		req.body.technicianIds = req.body.technicianIds.split(",");	// string to array.

		await insertIntoSchedTechnicians(req);

		return { status: "OK" , message: "New schedule was added successfully" };
	} catch(e) {
		throw e;
	}
}

function datesAreValid(params) {
	if (params === undefined || params == null)
		return { status: "Error", message: "Object params not found." };

	/*************************************************************/
	let date1 = new Date(params.utcDateFrom).getTime();
	let date2 = new Date(params.utcDateTo).getTime();

	if (date1 > date2)
		return { status: "Error", "message": "From date is greater than to date." };
	else
		return { status: "OK"};
	/*************************************************************/
}

async function updateSchedule(params) {
	try {
		if (utils.isSet(params, "utcDateFrom") && utils.isSet(params, "utcDateTo")) {
			let retVal = datesAreValid(params);
			if (retVal.status == "Error")
				return retVal;
		}

		let sql = "update USR_schedules set invoiceNo = @invoiceNo, utcUpdateDate = getutcdate()";

		if (utils.isSet(params, "utcDateFrom"))
			sql += ", utcDateFrom = @utcDateFrom";
		if (utils.isSet(params, "utcDateTo"))
			sql += ", utcDateTo = @utcDateTo";
		if (utils.isSet(params, "subject"))
			sql += ", subject = @subject";
		if (utils.isSet(params, "description"))
			sql += ", description = @description";
		if (utils.isSet(params, "allDay") && (params.allDay === 'true'))
			sql += ", allDay = 'Y'";
		else if (utils.isSet(params, "allDay") && (params.allDay === 'false'))
			sql += ", allDay = 'N'";
		if (utils.isSet(params, 'recurrenceRule'))
			sql += ", recurrenceRule = @recurrenceRule";

		sql += " where id = @id";

		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});

		if (utils.isSet(params, "subject"))
			request.addParameter('subject', TYPES.NVarChar, params.subject);
		if (utils.isSet(params, "utcDateFrom"))
			request.addParameter('utcDateFrom', TYPES.DateTime, params.utcDateFrom);
		if (utils.isSet(params, "utcDateTo"))
			request.addParameter('utcDateTo', TYPES.DateTime, params.utcDateTo);
		if (utils.isSet(params, "description"))
			request.addParameter('description', TYPES.NVarChar, params.description);
		if (utils.isSet(params, 'recurrenceRule'))
			request.addParameter('recurrenceRule', TYPES.NVarChar, params.recurrenceRule);


		request.addParameter('invoiceNo', TYPES.NVarChar, params.invoiceNo);
		request.addParameter('id', TYPES.Int, parseInt(params.id));
		await utils.executeRequestAsync(request);	// We just assume running sql was successful bc it's not capturing the rows affected.

		await updateSchedsCustomers(params);

		return { status: "OK" , message: "Schedule was updated successfully" };
	} catch(e) {
		throw e;
	}
}

async function updateSchedsCustomers(params) {
	try {
		if (!utils.isSet(params, 'technicianIds'))
			return { status: "Error" , message: "Technician id is missing. " };

		// let sql = schedulerSql.deleteScheduleCustomer();
		// There should be a better way to do this sql.
		// const sql = `delete USR_schedules_technicians where technicianId not in (${idss}) and schedId = @schedId`;
		const sql = `delete USR_schedules_technicians where schedId = @schedId`;
		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});
		request.addParameter('schedId', TYPES.Int, parseInt(params.id));

		await utils.executeRequestAsync(request);

		// console.log("params: ", params);	// params.technicianIds:  MGR,ADMIN
		// console.log("params.technicianIds: ", params.technicianIds);	// params.technicianIds:  MGR,ADMIN
		const newArray = params.technicianIds.replace("'", "").split(",");
		params.technicianIds = newArray;

		await insertIntoSchedTechnicians(params);
	} catch(e) {
		throw e;
	}
}

async function insertIntoSchedTechnicians(req) {
	if (!utils.isSet(req.body, "technicianIds"))
		return { status: "Error" , message: "Technician id is missing." };

	let sql = "";
	req.body.technicianIds.forEach((value) => {	// there's a better way to do this.
		sql += `insert into USR_schedules_technicians(schedId, technicianId) values(${req.body.id}, '${value}');`;
	})

	let request = new Request(sql, (err, rowCount) => {
		if (err)
			console.log(err);
	});

	await utils.executeRequestAsync(request);
}

async function getScheduleById(id) {
	try {
		let sql = schedulerSql.getScheduleById();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});
		request.addParameter('id', TYPES.Int, parseInt(params.id));

		return await utils.executeRequestAsync(request);
	} catch(e) {
		throw e;
	}
}

async function deleteSchedule(params) {
	try {
		let sql = schedulerSql.deleteSchedule();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});
		request.addParameter('id', TYPES.Int, parseInt(params.id));

		await utils.executeRequestAsync(request);
		return { status: "OK" , message: "A schedule was deleted successfully" };
	} catch(e) {
		throw e;
	}
}