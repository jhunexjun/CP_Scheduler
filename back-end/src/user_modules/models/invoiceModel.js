const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoiceSql = require('../sqlStatements/invoiceSql');


module.exports = {
	getInvoice,
}

async function getInvoice(req) {
	try {
		const sql = invoiceSql.getInvoice();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.query.sessionId)
					.input('invoiceNo', msSql.VarChar, req.query.invoiceNo)
					.query(sql)
			}).then(result => {
				return result.recordset;
			}).catch(err => {
				console.log(err);
			});
	} catch(e) {
		throw e;
	}
}
