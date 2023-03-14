const msSql = require('mssql')
const msSqlConnect = require('../dbConnections/msSqlConnect')
const extendSessionSql = require('../sqlStatements/extendSessionSql')


module.exports = {
	extendSession,
}

async function extendSession(req) {
	try {
		const sql = extendSessionSql.extendSessionSql();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.body.sessionId)
					.input('expiryInMinutes', msSql.VarChar, req.body.expiryInMinutes)
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
