const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoiceSql = require('../sqlStatements/invoiceSql');

const fsPromises = require('fs').promises;

module.exports = {
  getInvoice, getInvoiceNotes, saveSignature, getInvoiceSignature, getPdfDocument
}

async function getInvoice(req) {
  try {
    const sql = invoiceSql.getInvoice();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .input('invoiceNo', msSql.VarChar, req.query.workOrderNo)
          .query(sql)
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

async function getInvoiceNotes(req) {
  try {
    const sql = invoiceSql.getInvoiceNotes();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .input('invoiceNo', msSql.VarChar, req.query.workOrderNo)
          .query(sql)
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

async function saveSignature(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => 
          // .input('sessionId', msSql.VarChar, req.body.sessionId)
          // .input('signatureImg', msSql.Text, req.body.signatureImg)
          // .input('workOrderNo', msSql.NVarChar, req.body.workOrderNo)
          // .output('outputErrNo', msSql.Int)
          // .output('outputStatusMsg', msSql.NVarChar(500))
          // .query('exec dbo.USER_SP_workorderSignatureSave @sessionId, @signatureImg, @workOrderNo, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT')

        pool.request()
          .input('sessionId', msSql.NVarChar, req.body.sessionId)
          .input('workOrderNo', msSql.NVarChar, req.body.workOrderNo)
          .input('documentIsSigned', msSql.NVarChar, 'Y')

          .input('jsonAnnotation', msSql.NText, req.body.instantJsonAnnotation)    

          .input('signatureImg', msSql.NText, req.body.signatureImg)
          .output('outputErrNo', msSql.Int)
          .output('outputStatusMsg', msSql.NVarChar(500))
          .query('exec dbo.USER_SP_PDFSave @sessionId, @workOrderNo, @documentIsSigned, @jsonAnnotation, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT')
      ).then(async (result) => {
        if (result.output.outputErrNo == 0) {
          await fsPromises.writeFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.body.workOrderNo}.pdf`, req.file.buffer);

          return { status: 'OK', message: 'New Id created.', data: result.recordset[0].newId };
        } else {
          return { status: 'Error', message: result.output.outputStatusMsg }
        }
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

async function getInvoiceSignature(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .input('invoiceNo', msSql.VarChar, req.query.invoiceNo)
          .query('exec dbo.USER_SP_InvoiceSignatureGet @sessionId, @invoiceNo')
      }).then(result => {
        return result.recordset; // it should only retrieve one value of invoice.
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

/* If a record is already found in USER_PDFs means the pdf in the front-end has been modified like added annotation then saved
 * it as flat file.
 */
async function getPdfDocument(workOrderNo) {
  try {
    return await msSqlConnect.getInstance().then(pool => 
        pool.request()
          .input('workOrderNo', msSql.NVarChar, workOrderNo)
          .query('select workorderNo, documentIsSigned, annotations from USER_PDFs where workOrderNo = @workOrderNo')
      ).then(async (result) => {
          return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}