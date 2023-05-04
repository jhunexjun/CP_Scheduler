const customersModel = require('../models/customersModel');


module.exports = async function(req, res) {
	try {
		const customers = await customersModel.getListOfCustomers(req);

		if (customers.length < 1) {
			res.json({ status: 'OK', message: 'No customers found.', data: []});
			return;
		}

		if (customers[0].hasOwnProperty('errorNo')) {
			res.json({status: 'Error', message: customers[0].errMsg});
			return;
		}

		res.json({ status: 'OK', data: customers });
	} catch(e) {
		console.log(e);
	}
}