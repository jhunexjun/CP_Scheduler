const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const customersSSql = require('../sqlStatements/customersSql');

const fsPromises = require('fs').promises;

module.exports = {
  savePdfToFlatFileAsync, 
}

async function savePdfToFlatFileAsync(req) {
  try {
    return await fsPromises.writeFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.body.workOrderNo}.pdf`, req.file.buffer)
            .then(async () => {
              return await msSqlConnect.getInstance().then(pool => 
                pool.request()
                  .input('sessionId', msSql.NVarChar, req.body.sessionId)
                  .input('workOrderNo', msSql.NVarChar, req.body.workOrderNo)
                  .input('documentIsSigned', msSql.NVarChar, req.body.documentIsSigned)
                  .input('jsonAnnotation', msSql.NText, req.body.instantJsonAnnotation)
                  .input('signatureImg', msSql.Text, req.body.signatureImg)
                  .output('outputErrNo', msSql.Int)
                  .output('outputStatusMsg', msSql.NVarChar(500))
                  .query('exec dbo.USER_SP_PDFSave @sessionId, @workOrderNo, @documentIsSigned, @jsonAnnotation, @signatureImg, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT')
              )
              .then(() => true
              ).catch(err => {
                console.log(err);
                return false;
              });
            }).catch(e => false)
  } catch(e) {
    return false;
    throw e;
  }
}