const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const customersSSql = require('../sqlStatements/customersSql');

const fsPromises = require('fs').promises;

module.exports = {
  savePdfToFlatFile, 
}

async function savePdfToFlatFile(req) {
  try {
    return await fsPromises.writeFile(`${process.env.SIGNED_WORKORDERS_DIR}/${req.body.workOrderNo}.pdf`, req.file.buffer)
            .then(() => {
              return true;
            }).catch(e => false)
  } catch(e) {
    return false;
    throw e;
  }
}