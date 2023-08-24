const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');

module.exports = {
  getNotifications,
}

async function getNotifications(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .query('exec dbo.USER_SP_notificationsGet @sessionId')
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}