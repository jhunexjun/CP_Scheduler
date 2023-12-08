const workOrderModel = require('../models/workOrderModel');
const utils = require('../utils/util');

let resData;

module.exports = async function(req, res) {
  try {
    switch(req.method) {
    case 'GET':
      resData = await getSignature(req);
      res.json(resData);
      break;
    case 'POST':
      resData = await saveSignature(req);
      res.json(resData);
      break;
    default:
      res.json({ status: 'OK', message: 'Okay' });
    }
  } catch(e) {
    console.log(e);
  }
}

async function saveSignature(req) {
  if (!utils.isSet(req.body, 'sessionId'))
    return { status: "Error" , message: "sessionId body param is missing." };

  if (!utils.isSet(req.body, 'workOrderNo'))
    return { status: "Error", message: "workOrderNo body param is missing."};

  if (!utils.isSet(req.body, 'signatureImg'))
    return { status: "Error" , message: "signatureImg body param is missing." };

  if (!utils.isSet(req.body, 'instantJsonAnnotation'))
    return { status: "Error" , message: "instantJsonAnnotation body param is missing." };

  if (req.file === null)
    return { status: "Error" , message: "workorder pdf file is missing." };

  return await workOrderModel.saveSignature(req);
}

// async function getSignature(req) {
//   if (!utils.isSet(req.query, 'sessionId'))
//     return { status: "Error" , message: "sessionId query param is missing." };

//   if (!utils.isSet(req.query, 'invoiceNo'))
//     return { status: 'Error', message: 'invoiceNo query param is missing.' };

//   return await workOrderModel.getInvoiceSignature(req);
// }