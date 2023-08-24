const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');

module.exports = {
  checkValidity,
}

async function checkValidity(req) {
  try {
    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('sessionId', msSql.VarChar, req.query.sessionId)
          .query('exec dbo.USER_SP_CheckSessionValidity @sessionId')
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
}