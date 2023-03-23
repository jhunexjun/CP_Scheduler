const invoiceModel = require('../models/invoiceModel');


module.exports = async function(req, res) {
	try {
		const tableData = await invoiceModel.getInvoice(req);

		if (tableData.length < 1) {
			res.json({ status: 'OK', message: 'No invoice found.', data: {table: []} });
			return;
		}

		if (tableData[0].hasOwnProperty('errorNo')) {
			res.json({status: 'Error', message: tableData[0].errMsg});
			return;
		}

		res.json({ status: 'OK', data: {table: tableData} });
	} catch(e) {
		console.log(e);
	}
}