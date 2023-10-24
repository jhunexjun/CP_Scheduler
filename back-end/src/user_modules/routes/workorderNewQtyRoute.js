const util = require('../utils/util');
const workorderModel = require('../models/workOrderModel');

let resData;

module.exports = async function(req, res) {
  try {
    switch(req.method) {
      case 'POST':
        resData = await workorderSetLineItemsAsync(req);
        res.json(resData);
        break;
      default:
        res.json({ status: 'OK', message: 'Okay' });
    }
  } catch(e) {
    console.log(e);
  }
}

async function workorderSetLineItemsAsync(req) {
  if (!util.isSet(req.body, 'items'))
    return { status: 'Error', message: 'Payload items is missing' };

  if (!utils.isSet(req.body, 'sessionId'))
    return { status: "Error" , message: "sessionId body param is missing." };

  if (!utils.isSet(req.body, 'workorderNo'))
    return { status: "Error", message: "workOrderNo body param is missing."};

  const result = await workorderModel.workorderSetLineItemsAsync(req.body);
}