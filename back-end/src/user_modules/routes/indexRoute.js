let express = require('express');
let router = express.Router();


const schedulerRoute = require('./schedulerRoute');
const technicianRoute = require('./technicianRoute');
const invoicesRoute = require('./invoicesRoute');
const locationRoute = require('./locationRoute');


module.exports = function(app) {
    router.all('/schedule/:sessionId/:technicianId?', schedulerRoute);    // http://localhost:8080/admin/scheduler
    router.get('/technicians/:sessionId?', technicianRoute);   // http://localhost:8080/admin/technicians/:sessionId?
    router.get('/invoices/:sessionId?', invoicesRoute);   // http://localhost:8080/admin/invoices
    router.get('/location/:sessionId?', locationRoute);   // http://localhost:8080/admin/location

  return router;
}