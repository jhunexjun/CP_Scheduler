module.exports = {
	getInvoice,
}

function getInvoice() {
	return 'exec dbo.USER_InvoiceGet @sessionId, @invoiceNo';
}