const pdfFlatFileModel = require('../models/pdfFlatFileModel')
const util = require('../utils/util');

module.exports = async (req, res) => {
  try {
    switch(req.method) {
    case 'POST':
      await savePdfToFlatFile(req, res);
      break;
    }
  } catch(e) {
    console.log(e);
  }
}

async function savePdfToFlatFile(req, res) {
  const returnedValue = await pdfFlatFileModel.savePdfToFlatFile(req)

  if (returnedValue)  
    res.json({ status: 'OK', message: 'PDF Successfully saved' })
  else
    res.json({ status: 'Error', message: 'Something went wrong save pdf file' })
}