module.exports = {
	getInvoice, getInvoiceNotes, getInvoices
}

function getInvoice() {
	return 'exec dbo.USER_SP_InvoiceGet @sessionId, @invoiceNo';
}

function getInvoiceNotes() {
	return 'exec dbo.USER_SP_InvoiceNotesGet @sessionId, @invoiceNo';
}

function getInvoices() {
	return 'exec dbo.USER_SP_InvoicesListGet @sessionId';
}