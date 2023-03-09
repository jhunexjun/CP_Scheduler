let express = require('express');
let router = express.Router();


const schedulerRoute = require('./schedulerRoute');
const technicianRoute = require('./technicianRoute');
const workOrdersRoute = require('./workOrdersRoute');
const locationRoute = require('./locationRoute');
const logoutRoute = require('./logoutRoute')


module.exports = function(app) {
    router.all('/schedule/:sessionId/:technicianId?', schedulerRoute);    // http://localhost:8080/admin/scheduler
    router.get('/technicians/:sessionId?', technicianRoute);   // http://localhost:8080/admin/technicians/:sessionId?
    router.get('/workorders/:sessionId?', workOrdersRoute);   // http://localhost:8080/admin/workorders
    router.get('/location/:sessionId?', locationRoute);   // http://localhost:8080/admin/location
    router.put('/logout/:sessionId?', logoutRoute);   // http://localhost:8080/admin/logout

  return router;
}