const savePdfAnnotationModel = require('../models/savePdfAnnotationModel');
const utils = require('../utils/util');

let resData;

module.exports = async (req, res) => {
  try {
    switch(req.method) {
    case 'POST': 
      resData = await savePdfAnnotationAsync(req);
      res.json(resData);
      break;
    default: 
      res.json({status: 'OK', message: 'Okay'});
    }
  } catch(e) {
    console.log('Error in pdfannotationRoute: ', e);
  }
}

async function savePdfAnnotationAsync(req) {
  if (!utils.isSet(req.body, 'workOrderNo'))
    return {status: 'Error', message: 'Payload workOrderNo is missing.'}

  if (!utils.isSet(req.body, 'instantJSON'))
    return {status: 'Error', message: 'Payload instantJSON is missing.'}

  return savePdfAnnotationModel.savePdfAnnotationAsync(req.body);
}