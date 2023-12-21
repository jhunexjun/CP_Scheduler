const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const schedulerSql = require('../sqlStatements/schedulerSql');

// const Request = require('tedious').Request
// const TYPES = require('tedious').TYPES;
// const utils = require('../utils/util');


module.exports = {
	getTechnicians,
}

async function getTechnicians(req) {
	// try {
	// 	const sql = schedulerSql.getTechnicians();
	// 	let request = new Request(sql, (err) => {
	// 		if (err)
	// 			console.log(err);
	// 	});

	// 	request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
	// 	// request.addParameter('robot', TYPES.VarChar, req.query.robot);

	// 	const technicians = await utils.executeRequestAsync(request);

	// 	if (technicians[0].hasOwnProperty('errorNo')) {
	// 		return technicians;
	// 	} else {
	// 		const techsArray = [];
	// 		technicians.forEach((item) => {
	// 			let objTechnician = { id: item.USR_ID, text: item.NAM, phone1: item.PHONE_1, avatar: item.avatar || '' }
	// 			techsArray.push(objTechnician);
	// 		})

	// 		return techsArray;
	// 	}
	// } catch(e) {
	// 	throw e;
	// }

	try {
    return await msSqlConnect.getInstance().then(pool =>
        pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .query(schedulerSql.getTechnicians())
      ).then(async (technicians) => {
      	if (technicians.recordset[0].hasOwnProperty('errorNo')) {
						return technicians.recordset;
					} else {
						const techsArray = [];
						technicians.recordset.forEach((item) => {
							let objTechnician = { id: item.USR_ID, text: item.NAM, phone1: item.PHONE_1, avatar: item.avatar || '' }
							techsArray.push(objTechnician);
						})

						return techsArray;
					}
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}
