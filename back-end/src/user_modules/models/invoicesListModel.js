const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoicesSql = require('../sqlStatements/invoicesSql');


module.exports = {
	getInvoices,
}

async function getInvoices(req) {
	try {
		const sql = invoicesSql.getInvoices();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.query.sessionId)
					// .input('invoiceNo', msSql.VarChar, req.query.invoiceNo)
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
