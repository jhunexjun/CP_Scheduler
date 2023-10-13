const pdfFlatFileModel = require('../models/pdfFlatFileModel')
const util = require('../utils/util');

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

  const returnedValue = await pdfFlatFileModel.savePdfToFlatFileAsync(req)

  if (returnedValue)
    return { status: 'OK', message: 'PDF Successfully saved' }
  else
    return { status: 'Error', message: 'Something went wrong saving pdf file' }
}