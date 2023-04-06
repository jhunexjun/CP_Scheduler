const invoicesListModel = require('../models/invoicesListModel');


module.exports = async function(req, res) {
	try {
		const tableData = await invoicesListModel.getInvoices(req);

		if (tableData.length < 1) {
			res.json({ status: 'OK', message: 'No invoice found.', data: {table: []} });
			return;
		}

		if (tableData[0].hasOwnProperty('errorNo')) {
			res.json({status: 'Error', message: tableData[0].errMsg});
			return;
		}

		res.json({ status: 'OK', data: tableData });
	} catch(e) {
		console.log(e);
	}
}