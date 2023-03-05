const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getInvoices,
}

// We can use this function or incorporate this in the stored proc. But this was usually usaed for dynamic sql.
async function sessionIsValid(sessionId) {
	try {
		let request = new Request('exec dbo.USER_CheckSessionValidity @sessionId', (err, rowCount) => {
			if (err)
				console.log(err);
		});

		request.addParameter('sessionId', TYPES.NVarChar, sessionId);
		let returnval = await utils.executeRequestAsync(request);

		if (returnval[0].errorNo == 0)
			return true;
		else
			return false
	} catch(e) {
		throw e;
	}
}

async function getInvoices(req) {
	try {
		if (!await sessionIsValid(req.params.sessionId))
			return { status: 'Error', message: 'Session is invalid.' };

		const sql = schedulerSql.getInvoices();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});

		const customers = await utils.executeRequestAsync(request);

		const objInvoicesArray = [];
		customers.forEach((item) => {
			let objCust = { id: item.TKT_NO,
							text: item.NOTE_TXT,
							docId: item.DOC_ID,
							custNo: item.CUST_NO,
							billNam: item.BILL_NAM,
						}
			objInvoicesArray.push(objCust);
		})

		return objInvoicesArray;
	} catch(e) {
		throw e;
	}
}
