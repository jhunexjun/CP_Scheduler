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

async function getSchedule(req) {
	try {
		const sql = schedulerSql.getSchedule();
		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});

		request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
		request.addParameter('technicianId', TYPES.VarChar, req.query.technicianId);
		// request.addParameter('robot', TYPES.VarChar, req.query.robot ?? 'Y');	// if Y we assume it's robot.

		const scheds = await utils.executeRequestAsync(request);

		// console.log('scheds: ', scheds)

		if (scheds.length <= 0 || scheds[0].hasOwnProperty('errorNo')) {
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

		request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
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

// async function sessionIsValid(sessionId) {
// 	try {
// 		let request = new Request('exec dbo.USER_CheckSessionValidity @sessionId', (err, rowCount) => {
// 			if (err)
// 				console.log(err);
// 		});

// 		request.addParameter('sessionId', TYPES.NVarChar, sessionId);
// 		let returnval = await utils.executeRequestAsync(request);

// 		if (returnval[0].errorNo == 0)
// 			return true;
// 		else
// 			return false
// 	} catch(e) {
// 		throw e;
// 	}
// }

async function updateSchedule(req) {
	try {
		// if (!await sessionIsValid(req.params.sessionId))
		// 	return { status: 'Error', message: 'Session is invalid.' };

		if (utils.isSet(req.body, "utcDateFrom") && utils.isSet(req.body, "utcDateTo")) {
			let retVal = datesAreValid(req.body);
			if (retVal.status == "Error")
				return retVal;
		}

		let sql = "update USR_schedules set invoiceNo = @invoiceNo, utcUpdateDate = getutcdate()";

		if (utils.isSet(req.body, "utcDateFrom"))
			sql += ", utcDateFrom = @utcDateFrom";
		if (utils.isSet(req.body, "utcDateTo"))
			sql += ", utcDateTo = @utcDateTo";
		if (utils.isSet(req.body, "subject"))
			sql += ", subject = @subject";
		if (utils.isSet(req.body, "description"))
			sql += ", description = @description";
		if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'true'))
			sql += ", allDay = 'Y'";
		else if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'false'))
			sql += ", allDay = 'N'";
		if (utils.isSet(req.body, 'recurrenceRule'))
			sql += ", recurrenceRule = @recurrenceRule";

		sql += " where id = @id";

		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});

		if (utils.isSet(req.body, "subject"))
			request.addParameter('subject', TYPES.NVarChar, req.body.subject);
		if (utils.isSet(req.body, "utcDateFrom"))
			request.addParameter('utcDateFrom', TYPES.DateTime, req.body.utcDateFrom);
		if (utils.isSet(req.body, "utcDateTo"))
			request.addParameter('utcDateTo', TYPES.DateTime, req.body.utcDateTo);
		if (utils.isSet(req.body, "description"))
			request.addParameter('description', TYPES.NVarChar, req.body.description);
		if (utils.isSet(req.body, 'recurrenceRule'))
			request.addParameter('recurrenceRule', TYPES.NVarChar, req.body.recurrenceRule);


		request.addParameter('invoiceNo', TYPES.NVarChar, req.body.invoiceNo);
		request.addParameter('id', TYPES.Int, parseInt(req.body.id));
		await utils.executeRequestAsync(request);	// We just assume running sql was successful bc it's not capturing the rows affected.

		await updateSchedsCustomers(req);

		return { status: "OK" , message: "Schedule was updated successfully" };
	} catch(e) {
		throw e;
	}
}

async function updateSchedsCustomers(req) {
	try {
		if (!utils.isSet(req.body, 'technicianIds'))
			return { status: "Error" , message: "Technician id is missing. " };

		// let sql = schedulerSql.deleteScheduleCustomer();
		// There should be a better way to do this sql.
		// const sql = `delete USR_schedules_technicians where technicianId not in (${idss}) and schedId = @schedId`;
		const sql = `delete USR_schedules_technicians where schedId = @schedId`;
		let request = new Request(sql, (err, rowCount) => {
			if (err)
				console.log(err);
		});
		request.addParameter('schedId', TYPES.Int, parseInt(req.body.id));

		await utils.executeRequestAsync(request);

		// console.log("req.body: ", req.body);	// req.body.technicianIds:  MGR,ADMIN
		// console.log("req.body.technicianIds: ", req.body.technicianIds);	// req.body.technicianIds:  MGR,ADMIN
		const newArray = req.body.technicianIds.replace("'", "").split(",");
		req.body.technicianIds = newArray;

		await insertIntoSchedTechnicians(req);
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

// async function getScheduleById(id) {
// 	try {
// 		let sql = schedulerSql.getScheduleById();
// 		let request = new Request(sql, (err) => {
// 			if (err)
// 				console.log(err);
// 		});
// 		request.addParameter('id', TYPES.Int, parseInt(params.id));

// 		return await utils.executeRequestAsync(request);
// 	} catch(e) {
// 		throw e;
// 	}
// }

async function deleteSchedule(req) {
	try {
		// if (!await sessionIsValid(req.params.sessionId))
		// 	return { status: 'Error', message: 'Session is invalid.' };

		let sql = schedulerSql.deleteSchedule();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});
		request.addParameter('id', TYPES.Int, parseInt(req.body.id));

		await utils.executeRequestAsync(request);
		return { status: "OK" , message: "A schedule was deleted successfully" };
	} catch(e) {
		throw e;
	}
}