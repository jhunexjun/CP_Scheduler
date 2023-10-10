const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoiceSql = require('../sqlStatements/invoiceSql');

const fsPromises = require('fs').promises;

module.exports = {
  getInvoice, getInvoiceNotes, saveSignature, getInvoiceSignature
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
        pool.request()
          .input('sessionId', msSql.VarChar, req.body.sessionId)
          .input('signatureImg', msSql.Text, req.body.signatureImg)
          .input('workOrderNo', msSql.NVarChar, req.body.workOrderNo)
          .output('outputErrNo', msSql.Int)
          .output('outputStatusMsg', msSql.NVarChar(500))
          .query('exec dbo.USER_SP_workorderSignatureSave @sessionId, @signatureImg, @workOrderNo, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT')
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