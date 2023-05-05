const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const smsSql = require('../sqlStatements/smsSql');
const util = require('../utils/util');

module.exports = {
	insertSms, getSms, getAllSmsByCustomer
}

async function insertSms(req, messageSid, smsStatus) {
	try {
		const sql = smsSql.insertSms();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.NVarChar, req.query.sessionId)
					.input('recipient', msSql.VarChar, req.body.recipient)
					.input('sms', msSql.NVarChar, req.body.smsMessage)
					.input('messageSid', msSql.NVarChar, messageSid)
					.input('dateTimeSent', msSql.DateTime, util.formatDateMMddYYYYhhmmss(new Date()))
					.input('status', msSql.NVarChar, smsStatus)	// 'Sent', 'Outbox', etc.
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

async function getSms(req) {
	try {
		const sql = smsSql.getSms();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.NVarChar, req.query.sessionId)
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

async function getAllSmsByCustomer(req) {
	try {
		const sql = smsSql.getAllSmsByCustomer();
		return await msSqlConnect.getInstance().then(pool => {
				return pool.request()
					.input('sessionId', msSql.NVarChar, req.query.sessionId)
					.input('custNo', msSql.NVarChar, req.query.custNo)
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

