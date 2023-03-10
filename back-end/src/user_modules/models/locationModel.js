const msSql = require('mssql')
const msSqlConnect = require('../dbConnections/msSqlConnect')
const locationSql = require('../sqlStatements/locationSql');


module.exports = {
	getLocation,
}

async function getLocation(req) {
	try {
		const sql = locationSql.getLocation();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.query.sessionId)
					.input('robot', msSql.VarChar, req.query.robot ?? 'Y')
					.query(sql)
			}).then(result => {
				return result.recordset[0];
			}).catch(err => {
				console.log(err);
			});
	} catch(e) {
		throw e;
	}
}
