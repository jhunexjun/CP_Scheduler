let express = require('express');
let router = express.Router();


const schedulerRoute = require('./schedulerRoute');
const technicianRoute = require('./technicianRoute');
const invoicesRoute = require('./invoicesRoute');


module.exports = function(app) {
    router.all('/schedule', schedulerRoute);    // http://localhost:8080/admin/scheduler
    router.get('/technicians', technicianRoute);   // http://localhost:8080/admin/technicians
    router.get('/invoices', invoicesRoute);   // http://localhost:8080/admin/invoices

  return router;
}