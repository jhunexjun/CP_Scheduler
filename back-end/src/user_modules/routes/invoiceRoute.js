const fsPromises = require('fs').promises;
const fs = require('fs');
const workOrderModel = require('../models/workOrderModel');


/* 
 * // if pdf file is signed it will returns the static physical file otherwise return the raw data.
 */
module.exports = async function(req, res) {
  try {
    fs.accessSync(`${process.env.SIGNED_WORKORDERS_DIR}/${req.query.workOrderNo}.pdf`, fs.constants.R_OK | fs.constants.W_OK);
    const base64Pdf = await fsPromises.readFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.query.workOrderNo}.pdf`, 'base64');

    res.json({ status: 'OK', data: {pdfFile: base64Pdf, rawData: null} });
  } catch(e) {
    try {
      // If file doesn't exists, we assume file isn't signed and that we send the raw data to generate PDF in the front-end.

      const tableData = await workOrderModel.getInvoice(req);

      if (tableData.length < 1) {
        res.json({ status: 'OK', message: 'No invoice found.', data: { pdfFile: null, rawData: { table: [], notes: [] } } });
        return;
      }

      if (tableData[0].hasOwnProperty('errorNo')) {
        res.json({status: 'Error', message: tableData[0].errMsg});
        return
      }

      const workOrderNotes = await workOrderModel.getInvoiceNotes(req);

      const x = {
                  table: tableData,
                  notes: workOrderNotes,
                  barcode: {
                    base64: null
                  },
                  signature: {
                    signature: '',
                    dateSigned: '',
                  }
                }

      res.json({ status: 'OK', data: {pdfFile: null, rawData: x} });
    } catch(e) {
      console.log(e);
    }
  }  
}