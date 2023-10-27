let express = require('express');
let router = express.Router();

const schedulerRoute = require('./schedulerRoute');
const technicianRoute = require('./technicianRoute');
const workOrdersRoute = require('./workOrdersRoute');
const locationRoute = require('./locationRoute');
const logoutRoute = require('./logoutRoute');
const extendSessionRoute = require('./extendSessionRoute');
const workorderRoute = require('./invoiceRoute');
const invoicesListRoute = require('./invoicesListRoute');
const customersRoute = require('./customersRoute');
const smsRoute = require('./smsRoute');
const sms2Route = require('./sms2Route');
const smsByCustomerRoute = require('./smsByCustomerRoute');
const notificationsRoute = require('./notificationsRoute');
// const workOrderSignRoute = require('./workOrderSignRoute');
const resendWorkOrderPdfRoute = require('./sendWorkOrderPdfRoute');
// const pdfannotationRoute = require('./pdfannotationRoute');
const workorderPdfRoute = require('./workorderPdfRoute');
// const workorderNewQtyRoute = require('./workorderNewQtyRoute');

module.exports = function(app) {
  router.all('/schedule', schedulerRoute);    // http://localhost:8080/admin/scheduler
  router.get('/technicians', technicianRoute);   // http://localhost:8080/admin/technicians?sessionId=sessionId=6796B252-W-X-Y-Z
  router.get('/workorders', workOrdersRoute);   // http://localhost:8080/admin/workorders?sessionId=6796B252-W-X-Y-Z
  router.get('/location', locationRoute);   // http://localhost:8080/admin/location?sessionId=6796B252-7279-47D1-9BE9-986EDD99D6C8
  router.put('/logout', logoutRoute);   // http://localhost:8080/admin/logout
  router.put('/extendsession', extendSessionRoute);   // http://localhost:8080/admin/extendSession
  router.get('/workorder', workorderRoute);
  router.get('/invoiceslist', invoicesListRoute); // rename to workorderListRoute.
  router.get('/customers', customersRoute);
  router.post('/sms', smsRoute);  // Twilio webhook.
  router.all('/sms2', sms2Route); // sending SMS from Scheduler.
  router.get('/sms/customer', smsByCustomerRoute);    // get all SMS by a Customer.
  router.get('/notifications', notificationsRoute);
  // router.all('/workordersign', workOrderSignRoute);
  router.all('/sendworkorderpdf', resendWorkOrderPdfRoute);
  // router.all('/pdfannotation', pdfannotationRoute); // deprecated.
  router.all('/workorderpdf', workorderPdfRoute);
  //router.all('/workorder/newqty', workorderNewQtyRoute);

  return router;
}