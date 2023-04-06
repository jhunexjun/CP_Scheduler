module.exports = {
	getInvoices,
}

function getInvoices() {
	return 'exec dbo.USER_InvoicesListGet @sessionId';
}