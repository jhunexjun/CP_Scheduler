const msSql = require('mssql')
const msSqlConnect = require('../dbConnections/msSqlConnect')
const sessionSql = require('../sqlStatements/sessionSql');


module.exports = {
	createSession
}

async function createSession(req) {
	try {
		const sql = sessionSql.createSession();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('userId', msSql.VarChar, req.query.userid)
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