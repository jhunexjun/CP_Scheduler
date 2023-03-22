const invoiceModel = require('../models/invoiceModel');


module.exports = async function(req, res) {
	try {
		const tableData = await invoiceModel.getInvoice(req);

		if (tableData[0].hasOwnProperty('errorNo')) {
			res.json({status: 'Error', message: tableData[0].errMsg});
			return;
		}

		const invoice = {
			table: tableData,
			billingAdrs: null,
			shippinhAdrs: null,
			vehicleInfo: null,
		}

		res.json({ status: 'OK', data: invoice });
	} catch(e) {
		console.log(e);
	}
}