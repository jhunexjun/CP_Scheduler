const invoiceModel = require('../models/invoiceModel');

module.exports = async function(req, res) {
  try {
    const tableData = await invoiceModel.getInvoice(req);

    if (tableData.length < 1) {
      res.json({ status: 'OK', message: 'No invoice found.', data: {table: [], notes: []} });
      return;
    }

    if (tableData[0].hasOwnProperty('errorNo')) {
      res.json({status: 'Error', message: tableData[0].errMsg});
      return;
    }

    const invoiceNotes = await invoiceModel.getInvoiceNotes(req);

    const x = {
          table: tableData,
          notes: invoiceNotes,
          barcode: {
            base64: null
          },
          signature: {
            signature: '',
            dateSigned: '',
          }
        }

    res.json({ status: 'OK', data: x });
  } catch(e) {
    console.log(e);
  }
}