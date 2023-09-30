const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoiceSql = require('../sqlStatements/invoiceSql');


module.exports = {
  getInvoice, getInvoiceNotes, signInvoice, getInvoiceSignature
}

async function getInvoice(req) {
  try {
    const sql = invoiceSql.getInvoice();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .input('invoiceNo', msSql.VarChar, req.query.invoiceNo)
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
          .input('invoiceNo', msSql.VarChar, req.query.invoiceNo)
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

async function signInvoice(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.body.sessionId)
          .input('signatureImg', msSql.Text, req.body.signatureImg)
          .input('invoiceNo', msSql.NVarChar, req.body.invoiceNo)
          .output('outputErrNo', msSql.Int)
          .output('outputMessage', msSql.NVarChar(500))
          .query('exec dbo.USER_SP_InvoiceSignatureSave @sessionId, @signatureImg, @invoiceNo')
      }).then(result => {
        if (result.output.outputErrNo === null)
          return { status: 'OK', message: 'New Id created.', data: result.recordset[0].newId };
        else
          return { status: 'Error', message: result.output.outputMessage }
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
