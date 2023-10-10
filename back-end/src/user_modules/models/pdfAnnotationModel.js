const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const customersSSql = require('../sqlStatements/customersSql');

module.exports = {
  savePdfAnnotationAsync, getPdfAnnotationAsync
}

async function savePdfAnnotationAsync(reqBody) {
  try {
    const instantJSON = JSON.stringify(reqBody.instantJSON);

    return await msSqlConnect.getInstance().then(pool => {
      return pool.request()
        .input('sessionId', msSql.NVarChar, reqBody.sessionId)
        .input('workOrderNo', msSql.NVarChar, reqBody.workOrderNo)
        .input('instantJSON', msSql.NText, instantJSON)
        .query('exec dbo.USER_SP_PdfAnnotationSave @sessionId, @workOrderNo, @instantJSON')
    }).then(result => {
      return result.recordset;
    }).catch(err => {
      console.log(err);
    });
  } catch(e) {
    throw e;
  }
}

async function getPdfAnnotationAsync(reqQuery) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
      return pool.request()
        .input('sessionId', msSql.NVarChar, reqQuery.sessionId)
        .input('workOrderNo', msSql.NVarChar, reqQuery.workOrderNo)
        .query('exec dbo.USER_SP_PdfAnnotationGet @sessionId, @workOrderNo')
    }).then(result => {
      return result.recordset;
    }).catch(err => {
      console.log(err);
    });
  } catch(e) {
    throw e;
  }
}