var Service = require('node-windows').Service;
var svc = new Service({
 name:'CompuTant Scheduler',
 description: 'Back-end nodejs service for CompuTant Scheduler.',
 script: 'C:\\Projects\\CP_Scheduler\\back-end\\dist\\server.js'
});

svc.on('uninstall',function(){
 console.log('Uninstall complete.');
});

svc.uninstall();