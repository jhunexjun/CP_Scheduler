/* To merge with workOrderModel.js
 */
const fsPromises = require('fs').promises;

const utils = require('../utils/util');
const dotenv = require('dotenv');
const mailTransporter = require('../utils/mailTransporter');
const workOrdersModel = require('../models/workOrdersModel');

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

/* We do not allow sending unsigned document.
 * Sends notification that the document has been signed.
 */
async function sendPdf(req) {
  if (!utils.isSet(req.body, 'workOrderNo'))
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
    text: `This serves as a notification that workorder ${req.body.workOrderNo} has been signed.`, // plain text body
    // html: "<b>Hello world?</b>", // html body
    attachments: [{
      filename: req.body.workOrderNo + '.pdf',
      // content: req.file.buffer,
      content: await fsPromises.readFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.query.workOrderNo}.pdf`, 'base64')
    }]
  });

  // await fsPromises.writeFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.body.workOrderNo}.pdf`, req.file.buffer);

  return { status: 'OK', message: `Email sent! Info message id: ${info.messageId}` }
}