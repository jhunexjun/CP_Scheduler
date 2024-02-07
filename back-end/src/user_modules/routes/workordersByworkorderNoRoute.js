const workorderModel = require('../models/workOrderModel');

const utils = require('../utils/util');

module.exports = async function(req, res) {
  try {
    switch(req.method) {
      case 'GET':
        if (req.query.workorderNo === undefined || req.query.workOrderNo === null) {
          res.json({status: 'Error', message: 'workorderNo param is missing'});
          return;
        }

        const result = await workorderModel.getAppointmentByWorkorderNoAsync(req);
        res.json({status: 'OK', data: result.recordset});

        break;
      default:
        res.json({status: 'OK', message: 'Okay'});
    }
  } catch(e) {
    console.log(e);
  }
}