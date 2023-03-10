const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getTechnicians,
}

async function getTechnicians(req) {
	try {
		const sql = schedulerSql.getTechnicians();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});

		request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
		request.addParameter('robot', TYPES.VarChar, req.query.robot);

		const technicians = await utils.executeRequestAsync(request);

		if (technicians[0].hasOwnProperty('errorNo')) {
			return technicians;
		} else {
			const techsArray = [];
			technicians.forEach((item) => {
				let objTechnician = { id: item.USR_ID, text: item.NAM, phone1: item.PHONE_1, avatar: item.avatar || '' }
				techsArray.push(objTechnician);
			})

			return techsArray;
		}
	} catch(e) {
		throw e;
	}
}
