module.exports = {
	getInvoice, getInvoiceNotes
}

function getInvoice() {
	return 'exec dbo.USER_InvoiceGet @sessionId, @invoiceNo';
}

function getInvoiceNotes() {
	return 'exec dbo.USER_InvoiceNotesGet @sessionId, @invoiceNo';
}