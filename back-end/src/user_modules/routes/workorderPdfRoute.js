const pdfModel = require('../models/pdfModel')
const workOrdersModel = require('../models/workOrdersModel');
const workorderModel = require('../models/workOrderModel');

const fsPromises = require('fs').promises;

const util = require('../utils/util');

const dotenv = require('dotenv');
const mailTransporter = require('../utils/mailTransporter');

let resData;

module.exports = async (req, res) => {
  try {
    switch(req.method) {
    case 'POST':
      resData = await saveWorkorderPdfAsync(req, res);
      res.json(resData);
      break;
    default:
      res.json({ status: 'OK', message: 'Okay' });
    }
  } catch(e) {
    console.log(e);
  }
}

async function saveWorkorderPdfAsync(req, res) {
  if (!util.isSet(req.body, 'sessionId'))
    return { status: 'Error', message: 'Payload sessionId is missing' };

  if (!util.isSet(req.body, 'workorderNo'))
    return { status: 'Error', message: 'Payload workorderNo is missing' };

  if (!util.isSet(req.body, 'documentIsSigned'))
    return { status: 'Error', message: 'Payload documentIsSigned is missing' };

  const foundPdf = await workorderModel.getPdfDocument(req.body.workorderNo);
  const pdfSaved = await workorderModel.saveWorkorderPdfAsync(req);

  if (pdfSaved) {
    let message = 'PDF successfully saved.';

    // We only send the document if it has just been signed.
    if (
      (foundPdf.length === 0 && req.body.documentIsSigned == 'Y') // first time saving but doc is signed.
        || (foundPdf.length > 0
            && (foundPdf[0].documentIsSigned != req.body.documentIsSigned)
            && (req.body.documentIsSigned == 'Y')
          )
      ) {
      try {
        await fsPromises.writeFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.body.workorderNo}.pdf`, req.file.buffer);
      } catch(e) {
        return { status: 'Error', message: 'Something went wrong saving pdf file' }
      }

      if (!await sendPdf(req))
        message = message + ' Warning: sending pdf through email, failed.';
    }

    return { status: 'OK', message: message }
  }
  else
    return { status: 'Error', message: 'Something went wrong saving pdf file' }
}

/*
 * Sends email that the document has been signed.
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