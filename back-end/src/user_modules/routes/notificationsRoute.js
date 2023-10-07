const notificationModel = require('../models/notificationModel');

module.exports = async function(req, res) {
  try {
    const notifications = await notificationModel.getNotifications(req);
    res.json({ status: 'OK', data: notifications });
  } catch(e) {
    console.log("Error in notificationsRoute: ", e);
  }
}