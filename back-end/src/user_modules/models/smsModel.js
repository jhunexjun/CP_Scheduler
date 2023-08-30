const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const smsSql = require('../sqlStatements/smsSql');
const util = require('../utils/util');

module.exports = {
  insertSms, getSms, getAllSmsByCustomer, insertTwilioInbox, insertSmsNoSession, getBroadcastRecipients
}

async function insertSms(req, messageSid, smsStatus) {
  try {
    const sql = smsSql.insertSms();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.NVarChar, req.query.sessionId)
          .input('custNo', msSql.NVarChar, req.body.customerNo)
          .input('recipient', msSql.VarChar, req.body.recipient)
          .input('sms', msSql.NVarChar, req.body.smsMessage)
          .input('messageSid', msSql.NVarChar, messageSid)
          .input('dateTimeSent', msSql.DateTime, util.formatDateMMddYYYYhhmmss(new Date()))
          .input('status', msSql.NVarChar, smsStatus) // 'Sent', 'Outbox', etc.
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

async function insertSmsNoSession(data, messageSid, smsStatus) {
  try {
    const sql = 'insert into USR_SmsMessages(UserId, AlertId, customerNo, Recipient,  Sms, utcToBeSentOn, MessageSid, utcDateTimeSent, [Status], DateCreated) ' +
                                    'values(    0,      0,        0,     @recipient, @sms, GETUTCDATE(), @messageSid, @dateTimeSent, @status,  GETUTCDATE())';

    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('recipient', msSql.VarChar, data.recipient)
          .input('sms', msSql.NVarChar, data.smsMessage)
          .input('messageSid', msSql.NVarChar, messageSid)
          .input('dateTimeSent', msSql.DateTime, util.formatDateMMddYYYYhhmmss(new Date()))
          .input('status', msSql.NVarChar, data.smsStatus) // 'Sent', 'Outbox', etc.
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

async function getSms(req) {
  try {
    const sql = smsSql.getSms();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.NVarChar, req.query.sessionId)
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

async function getAllSmsByCustomer(req) {
  try {
    const sql = smsSql.getAllSmsByCustomer();
    let smsByCustomerNo = await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.NVarChar, req.query.sessionId)
          .input('custNo', msSql.NVarChar, req.query.custNo)
          .query(sql)
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });



    return smsByCustomerNo;
  } catch(e) {
    throw e;
  }
}

async function insertTwilioInbox(req) {
  try {
    const sql = smsSql.insertTwilioInbox();
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          // .input('sessionId', msSql.NVarChar, req.query.sessionId)
          // .input('recipient', msSql.VarChar, req.body.recipient)
          // .input('sms', msSql.NVarChar, req.body.sms)
          // .input('dateTimeSent', msSql.DateTime, req.body.dateTimeSent)
          // .input('status', msSql.nvarchar, req.body.status)
          // .input('alertId', msSql.int, 0)
          // .input('sender', msSql.NVarChar, req.body.sender)
          // .input('message', msSql.VarChar, req.body.message)
          // .input('messageSid', msSql.NVarChar, req.body.messageSid)
          // .input('dateTimeReceived', msSql.DateTime, req.body.dateTimeReceived)
          // .input('dateCreated', msSql.DateTime, req.body.dateCreated)
          // .input('customerName', msSql.NVarChar, req.body.customerName)
          // from Twilio
          .input('toCountry', msSql.NVarChar, req.body.ToCountry)
          .input('toState', msSql.NVarChar, req.body.ToState)
          .input('smsMessageSid', msSql.NVarChar, req.body.SmsMessageSid)
          .input('numMedia', msSql.NVarChar, req.body.NumMedia)
          .input('toCity', msSql.NVarChar, req.body.ToCity)
          .input('fromZip', msSql.NVarChar, req.body.FromZip)
          .input('smsSid', msSql.NVarChar, req.body.SmsSid)
          .input('fromState', msSql.NVarChar, req.body.FromState)
          .input('smsStatus', msSql.NVarChar, req.body.SmsStatus)
          .input('fromCity', msSql.NVarChar, req.body.FromCity)
          .input('body', msSql.NVarChar, req.body.Body)
          .input('fromCountry', msSql.NVarChar, req.body.FromCountry)
          .input('to', msSql.NVarChar, req.body.To)
          .input('toZip', msSql.NVarChar, req.body.ToZip)
          .input('numSegments', msSql.NVarChar, req.body.NumSegments)
          .input('accountSid', msSql.NVarChar, req.body.AccountSid)
          .input('from', msSql.NVarChar, req.body.From)
          .input('apiVersion', msSql.NVarChar, req.body.ApiVersion)
          // end from Twilio
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

async function getBroadcastRecipients() {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .query('select mobileNo from USER_broadcastRecipients')
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}

