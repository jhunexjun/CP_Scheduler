// const Request = require('tedious').Request
// const TYPES = require('tedious').TYPES;
// const utils = require('../utils/util');

const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const schedulerSql = require('../sqlStatements/schedulerSql');


module.exports = {
  getWorkOrders,
  getSlsRepEmailByWorkOrderNo,
  getBillEmailByWorkOrderNo
}

// We can use this function or incorporate this in the stored proc. But this was usually usaed for dynamic sql.
// async function sessionIsValid(sessionId) {
//  try {
//    let request = new Request('exec dbo.USER_SP_CheckSessionValidity @sessionId', (err, rowCount) => {
//      if (err)
//        console.log(err);
//    });

//    request.addParameter('sessionId', TYPES.NVarChar, sessionId);
//    let returnval = await utils.executeRequestAsync(request);

//    if (returnval[0].errorNo == 0)
//      return true;
//    else
//      return false
//  } catch(e) {
//    throw e;
//  }
// }

async function getWorkOrders(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .query(schedulerSql.getWorkOrders())
      }).then(result => {
        if (result.recordset.length <= 0)
          return [];

        if (result.recordset[0].hasOwnProperty('errorNo')) {
          return result.recordset;
        }

        const objInvoicesArray = [];
        result.recordset.forEach((item) => {
          let objCust = { id: item.TKT_NO,
                  text: item.NOTE_TXT,
                  docId: item.DOC_ID,
                  docDate: item.TKT_DT,
                  custNo: item.CUST_NO,
                  billNam: item.BILL_NAM,
                  billPhone1: item.BILL_PHONE_1,
                  plateNo: item.USR_LIC_PLATE ?? '',
                  noteDate: item.NOTE_DAT,
                  noteUser: item.USR_ID,
                  serviceType: item.USR_SERVICE_TYP,
                  scheduled: item.scheduled
                }
          objInvoicesArray.push(objCust);
        })

        return objInvoicesArray;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }


  // try {
  //   const sql = schedulerSql.getWorkOrders();
  //   let request = new Request(sql, (err) => {
  //     if (err)
  //       console.log(err);
  //   });
  //   request.addParameter('sessionId', TYPES.VarChar, req.query.sessionId);
  //   const workOrders = await utils.executeRequestAsync(request);

  //   if (workOrders.length <= 0)
  //     return [];

  //   if (workOrders[0].hasOwnProperty('errorNo')) {
  //     return workOrders;
  //   }

  //   const objInvoicesArray = [];
  //   workOrders.forEach((item) => {
  //     let objCust = { id: item.TKT_NO,
  //             text: item.NOTE_TXT,
  //             docId: item.DOC_ID,
  //             docDate: item.TKT_DT,
  //             custNo: item.CUST_NO,
  //             billNam: item.BILL_NAM,
  //             billPhone1: item.BILL_PHONE_1,
  //             plateNo: item.USR_LIC_PLATE ?? '',
  //             noteDate: item.NOTE_DAT,
  //             noteUser: item.USR_ID,
  //             serviceType: item.USR_SERVICE_TYP,
  //           }
  //     objInvoicesArray.push(objCust);
  //   })

  //   return objInvoicesArray;
  // } catch(e) {
  //   throw e;
  // }
}

async function getSlsRepEmailByWorkOrderNo(reqBody) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('workOrderNo', msSql.VarChar, reqBody.workOrderNo)
          .query('select EMAIL_ADRS_1 from SY_USR where USR_ID = (select SLS_REP from PS_DOC_HDR where TKT_NO = @workOrderNo)')
      }).then(result => {
        // result.recordset:  [ { EMAIL_ADRS_1: null } ]
        if (result.recordset.length > 0)
          return result.recordset[0].EMAIL_ADRS_1;
        else
          return null;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

async function getBillEmailByWorkOrderNo(reqBody) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('workOrderNo', msSql.VarChar, reqBody.workOrderNo)
          .query('select BILL_EMAIL_ADRS_1 from VI_PS_DOC_HDR where TKT_NO = @workOrderNo')
      }).then(result => {
        // result.recordset 2:  [ { BILL_EMAIL_ADRS_1: 'refused@customer.com' } ]

        if (result.recordset.length > 0)
          return result.recordset[0].BILL_EMAIL_ADRS_1;
        else
          return '';
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}
