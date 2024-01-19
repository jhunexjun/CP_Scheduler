const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const customersSSql = require('../sqlStatements/customersSql');


module.exports = {
	getListOfCustomers,
	getCustomerByMobileNo
}

async function getListOfCustomers(req) {
	try {
		const sql = customersSSql.getListOfCustomers();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.query.sessionId)
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

async function getCustomerByMobileNo(req) {
	try {
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.query(`select top 1 NAM from AR_CUST where dbo.ufnGetMobileNo(MBL_PHONE_1) = ${req.body.From}`)
			}).then(result => {
				return result.recordset;
			}).catch(err => {
				console.log(err);
			});
	} catch(e) {
		throw e;
	}
}