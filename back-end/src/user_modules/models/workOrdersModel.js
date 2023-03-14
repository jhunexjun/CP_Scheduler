const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getWorkOrders,
}

// We can use this function or incorporate this in the stored proc. But this was usually usaed for dynamic sql.
// async function sessionIsValid(sessionId) {
// 	try {
// 		let request = new Request('exec dbo.USER_CheckSessionValidity @sessionId', (err, rowCount) => {
// 			if (err)
// 				console.log(err);
// 		});

// 		request.addParameter('sessionId', TYPES.NVarChar, sessionId);
// 		let returnval = await utils.executeRequestAsync(request);

// 		if (returnval[0].errorNo == 0)
// 			return true;
// 		else
// 			return false
// 	} catch(e) {
// 		throw e;
// 	}
// }

async function getWorkOrders(req) {
	try {
		const sql = schedulerSql.getWorkOrders();
		let request = new Request(sql, (err) => {
			if (err)
				console.log(err);
		});
		request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
		// request.addParameter('robot', TYPES.VarChar, req.query.robot ?? 'Y');

		const workOrders = await utils.executeRequestAsync(request);
		if (workOrders[0].hasOwnProperty('errorNo')) {
			return workOrders;
		}

		const objInvoicesArray = [];
		workOrders.forEach((item) => {
			let objCust = { id: item.TKT_NO,
							text: item.NOTE_TXT,
							docId: item.DOC_ID,
							custNo: item.CUST_NO,
							billNam: item.BILL_NAM,
							billPhone1: item.BILL_PHONE_1,
							plateNo: item.USR_LIC_PLATE ?? '',
							noteDate: item.NOTE_DAT,
							noteUser: item.USR_ID,
							serviceType: item.USR_SERVICE_TYP,
						}
			objInvoicesArray.push(objCust);
		})

		return objInvoicesArray;
	} catch(e) {
		throw e;
	}
}
