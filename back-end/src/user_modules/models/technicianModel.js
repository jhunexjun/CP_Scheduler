const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getTechnicians,
}

async function getTechnicians(req) {
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
							let objTechnician = { id: item.USR_ID, text: item.NAM, phone1: item.PHONE_1, avatar: item.USR_AVATAR || '' }
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
