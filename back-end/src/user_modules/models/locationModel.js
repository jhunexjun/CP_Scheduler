const msSql = require('mssql')
const msSqlConnect = require('../dbConnections/msSqlConnect')
// const Request = require('tedious').Request
// const TYPES = require('tedious').TYPES;
// const utils = require('../utils/util');

const locationSql = require('../sqlStatements/locationSql');


module.exports = {
	getLocation,
}

async function getLocation(req) {
	try {
		const sql = locationSql.getLocation();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.params.sessionId)
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
