const msSql = require('mssql')
const msSqlConnect = require('../dbConnections/msSqlConnect')
const logoutSql = require('../sqlStatements/logoutSql')


module.exports = {
	logoutSession,
}

async function logoutSession(req) {
	try {
		const sql = logoutSql.logoutSession();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.params.sessionId)
					.query(sql)
			}).then(result => {
				return result.rowsAffected[0];
			}).catch(err => {
				console.log(err);
			});
	} catch(e) {
		throw e;
	}
}
