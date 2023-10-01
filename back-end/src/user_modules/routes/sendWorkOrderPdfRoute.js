// const workOrderModel = require('../models/workOrderModel');
const utils = require('../utils/util');
const dotenv = require('dotenv');
const mailTransporter = require('../utils/mailTransporter');

dotenv.config();

let resData;

module.exports = async function(req, res) {
  try {
    switch(req.method) {
    case 'POST':
      resData = await sendPdf(req);
      res.json(resData);
      break;
    default:
      res.json({ status: 'OK', message: 'Okay' });
    }
  } catch(e) {
    console.log(e);
  }
}

/*
 * Sends notification that the document has been signed.
 */
async function sendPdf(req) {
  if (!utils.isSet(req.body, 'workOrderNo'))
    return { status: "Error", message: "workOrderNo body param is missing."};

  // Send mail with defined transport object
  const info = await mailTransporter.sendMail({
    from: 'jmorcilla@computant.com', // sender address
    to: process.env.WORKORDER_SIGN_RECIPIENTS, // list of receivers, separated by semi-colon.
    subject: "Scheduler System: Document has been signed.", // Subject line
    text: `This serves as a notification that work order ${req.body.workOrderNo} has been signed.`, // plain text body
    // html: "<b>Hello world?</b>", // html body
    attachments: [{
      filename: req.body.workOrderNo + '.pdf',
      content: req.file.buffer,
    }]
  });

  // console.log("Message sent: %s", info.messageId);

  return { status: 'OK', message: `Email sent! Info message id: ${info.messageId}` }
}