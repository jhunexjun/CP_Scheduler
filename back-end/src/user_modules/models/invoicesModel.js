const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
	getInvoices,
}

async function getInvoices() {
	try {
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
