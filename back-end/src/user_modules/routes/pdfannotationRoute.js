/* Deprecated. We now save flat file.
 *
 */

const pdfAnnotationModel = require('../models/pdfAnnotationModel');
const utils = require('../utils/util');

let resData;

module.exports = async (req, res) => {
  try {
    switch(req.method) {
    case 'POST': 
      resData = await savePdfAnnotationAsync(req);
      res.json(resData);
      break;
    case 'GET':
      resData = await getPdfAnnotationAsync(req.query)
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

  return pdfAnnotationModel.savePdfAnnotationAsync(req.body);
}

async function getPdfAnnotationAsync(reqQuery) {
  if (!utils.isSet(reqQuery, 'workOrderNo'))
    return {status: 'Error', message: 'Payload workOrderNo is missing.'}

  return { status: 'OK', data: await pdfAnnotationModel.getPdfAnnotationAsync(reqQuery) }
}