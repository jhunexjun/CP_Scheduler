const fsPromises = require('fs').promises;
const fs = require('fs');
const workOrderModel = require('../models/workOrderModel');


/*
 * If pdf file is signed it will returns the static physical file otherwise return the raw data.
 * Return: (a) If it can't access the file it return the raw data.
           (b) if the request query is requesting raw data ('Y').
 */
module.exports = async function(req, res) {
  try {
    // if (req.query.rawData != null && req.query.rawData == 'Y') {
    //   await sendRawDataAsync(req, res);
    //   return;
    // }

    const pdf = await workOrderModel.getPdfDocument(req.query.workOrderNo);

    // if pdf is > 0 means a PDF should have been saved somewhere in a DIR.
    if (pdf.length > 0 && pdf[0].documentIsSigned === 'Y') {
      fs.accessSync(`${process.env.SIGNED_WORKORDERS_DIR}/${req.query.workOrderNo}.pdf`, fs.constants.R_OK | fs.constants.W_OK);
      const base64Pdf = await fsPromises.readFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.query.workOrderNo}.pdf`, 'base64');

      res.json({ status: 'OK',
                    data: {
                      pdf: {
                        base64: base64Pdf,
                      },
                      rawData: null,
                      documentIsSigned: 'Y',  // We assume this is signed because we get the item from an actual file.
                                              // The result[0].documentIsSigned is just a recording bc workorder may have been
                                              // saved from front but not yet as signed.
                    }
                  });
    } else {
      await sendRawDataAsync(req, res);
    }
  } catch(e) {
    await sendRawDataAsync(req, res); // probably should not be sending the raw data whem it cannot access file.
  }
}

async function sendRawDataAsync(req, res) {
  try {
    // If file doesn't exists, we assume file isn't signed and that we send the raw data to generate PDF in the front-end.

    const tableData = await workOrderModel.getInvoice(req);

    if (tableData.length < 1) {
      res.json({ status: 'OK', message: 'No invoice found.', data: { pdf: null, rawData: { table: [], notes: [] } } });
      return;
    }

    if (tableData[0].hasOwnProperty('errorNo')) {
      res.json({status: 'Error', message: tableData[0].errMsg});
      return;
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
                },
              }

    res.json({ status: 'OK', data: {pdf: null, rawData: x, documentIsSigned: 'N'} });
  } catch(e) {
    console.log(e);
  }
}