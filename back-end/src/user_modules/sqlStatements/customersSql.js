module.exports = {
	getListOfCustomers,
}

function getListOfCustomers() {
	return 'exec dbo.USER_CustomersGet @sessionId';
}