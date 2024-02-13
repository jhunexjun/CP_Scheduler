const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const invoiceSql = require('../sqlStatements/invoiceSql');
const appointmentSql = require('../sqlStatements/schedulerSql');

const fsPromises = require('fs').promises;

const util = require('../utils/util');

module.exports = {
  getInvoice,
  getInvoiceNotes,
  saveSignature,
  getPdfDocument,
  saveWorkorderPdfAsync,
  getAppointmentByWorkorderNoAsync
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

/* If a record is already found in USER_workorders means the pdf in the front-end has been modified like added annotation then saved
 * it as flat file.
 */
async function getPdfDocument(workorderNo) {
  try {
    return await msSqlConnect.getInstance().then(pool =>
        pool.request()
          .input('workorderNo', msSql.NVarChar, workorderNo)
          .query('select workorderNo, documentIsSigned from USER_workorders where workorderNo = @workorderNo')
      ).then(async (result) => {
          return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

async function saveWorkorderPdfAsync(req) {
  try {
    return await msSqlConnect.getInstance()
                  .then(pool => {
                    pool.request()
                      .input('sessionId', msSql.NVarChar, req.body.sessionId)
                      .input('workorderNo', msSql.VarChar(15), req.body.workorderNo)
                      .input('documentIsSigned', msSql.NVarChar, req.body.documentIsSigned)
                      .input('signatureImg', msSql.Text, req.body.signatureImg)
                      .output('outputErrNo', msSql.Int)
                      .output('outputStatusMsg', msSql.NVarChar(500))
                      .query('exec dbo.USER_SP_WorkorderPdfSave @sessionId, @workorderNo, @documentIsSigned, @signatureImg, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT');

                    return pool;
                  })
                  .then(pool =>
                    pool.request()
                      .input('workorderNo', msSql.VarChar(15), req.body.workorderNo)
                      .query(`delete USER_workordersLineItems where workorderNo = @workorderNo`)
                  )
                  .then(async () => {
                    if (!util.isSet(req.body, 'tableJson'))
                      return true;

                    if (util.isNullOrWhiteSpace(req.body.tableJson))
                      return true;

                    const tableJsonObj = JSON.parse(req.body.tableJson);
                    const table = new msSql.Table('USER_workordersLineItems');

                    table.create = false;
                    table.columns.add('workorderNo', msSql.VarChar(15), { nullable: false });
                    table.columns.add('lineItemNo', msSql.SmallInt, { nullable: false });
                    table.columns.add('itemNo', msSql.VarChar(20), { nullable: false });
                    table.columns.add('descr', msSql.VarChar(50), { nullable: false });
                    table.columns.add('qty', msSql.Decimal(15, 4), { nullable: true });
                    table.columns.add('reasonId', msSql.SmallInt(2), { nullable: true });

                    for (let x = 0; x < tableJsonObj.length; x++) {
                      if (tableJsonObj[x].reasonId === null)
                        continue;

                      table.rows.add(req.body.workorderNo,
                                      x,
                                      tableJsonObj[x].itemNo,
                                      tableJsonObj[x].descr,
                                      tableJsonObj[x].newQty,
                                      tableJsonObj[x].reasonId
                                    ?? null);
                    }

                    const request = new msSql.Request();
                    await request.bulk(table);
                    return true;
                  }).catch(err => {
                    console.log(err);
                    return false;
                  });
  } catch(e) {
    return false;
    throw e;
  }
}

async function getAppointmentByWorkorderNoAsync(req) {
  try {
    return await msSqlConnect.getInstance()
            .then(pool => {
              return pool.request()
                .input('workorderNo', msSql.VarChar(15), req.query.workorderNo)
                .query(appointmentSql.getAppointmentByWorkorderNo());
            })
            .catch(err => console.log(err));
  } catch(e) {
    return false;
  }
}