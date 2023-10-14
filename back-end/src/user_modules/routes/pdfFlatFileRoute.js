const pdfFlatFileModel = require('../models/pdfFlatFileModel')
const workOrdersModel = require('../models/workOrdersModel');
const workOrderModel = require('../models/workOrderModel');
const util = require('../utils/util');
const dotenv = require('dotenv');
const mailTransporter = require('../utils/mailTransporter');

let resData;

module.exports = async (req, res) => {
  try {
    switch(req.method) {
    case 'POST':
      resData = await savePdfToFlatFileAsync(req, res);
      res.json(resData);
      break;
    }
  } catch(e) {
    console.log(e);
  }
}

async function savePdfToFlatFileAsync(req, res) {
  if (!util.isSet(req.body, 'sessionId'))
    return { status: 'Error', message: 'Payload sessionId is missing' };

  if (!util.isSet(req.body, 'workOrderNo'))
    return { status: 'Error', message: 'Payload workOrderNo is missing' };

  if (!util.isSet(req.body, 'documentIsSigned'))
    return { status: 'Error', message: 'Payload documentIsSigned is missing' };

  if (!util.isSet(req.body, 'instantJsonAnnotation'))
    return { status: 'Error', message: 'Payload instantJsonAnnotation is missing' };

  const result = await workOrderModel.getPdfDocument(req.body.workOrderNo);
  const returnedValue = await pdfFlatFileModel.savePdfToFlatFileAsync(req)

  if (returnedValue) {
    let message = 'PDF successfully saved.';

    // We only send the document if it has just been signed.
    if (
      (result.length === 0 && req.body.documentIsSigned == 'Y')
        || (result.length > 0
            && (result[0].documentIsSigned != req.body.documentIsSigned)
            && (req.body.documentIsSigned == 'Y')
          )
      ) {
      if (!await sendPdf(req))
        message = message + ' Warning: sending pdf through email, failed.';
    }

    return { status: 'OK', message: message }
  }
  else
    return { status: 'Error', message: 'Something went wrong saving pdf file' }
}

/*
 * Sends notification that the document has been signed.
 */
async function sendPdf(req) {
  try {
    if (!util.isSet(req.body, 'workOrderNo'))
      return { status: "Error", message: "workOrderNo body param is missing."};

    const slsRepEmail = await workOrdersModel.getSlsRepEmailByWorkOrderNo(req.body);
    const billEmailAdrs = await workOrdersModel.getBillEmailByWorkOrderNo(req.body);

    // Send mail with defined transport object
    const info = await mailTransporter.sendMail({
      from: 'jmorcilla@computant.com', // sender address
      to: process.env.WORKORDER_SIGN_RECIPIENTS
          + (slsRepEmail == null ? ';' : `;${slsRepEmail}`)
          + (billEmailAdrs == null ? ';' : `;${billEmailAdrs}`)
          , // list of receivers, separated by semi-colon.
      subject: "Scheduler System: Document has been signed.", // Subject line
      text: `This serves as a notification that work order ${req.body.workOrderNo} has been signed.`, // plain text body
      // html: "<b>Hello world?</b>", // html body
      attachments: [{
        filename: req.body.workOrderNo + '.pdf',
        content: req.file.buffer,
      }]
    });

    return true;
  } catch(e) {
    return false;
  }
}