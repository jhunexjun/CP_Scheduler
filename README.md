# Counterpoint Scheduler

There's no built-in scheduler with Counterpoint so this was built on top of it. This project was built using node.js express.js, MS SQL for back-end. Front-end use React.js.

## Installation

Install the following
1. node.js at least version v14.17.5.
2. Any code editor like Visual Studio Code. But me I use Sublime 3.
3. $ npm install pm2@latest -g
4. 

## Optional Installtion
Depends on what you use to run your front-end. You can use IIS. If you use IIS, use the web.config in order to run the react.js.
Tested on IIS. Refer to the internet on how to install IIS 10 for Windows 10 or 11. Then install the Windows URL Rewriter for IIS.

Use npm as installer for node.js. From the back-end folder, run `npm install`. Do the same in front-end folder.

### Reference
https://dev.to/sumitkharche/how-to-deploy-react-application-on-iis-server-1ied
https://serverok.in/how-to-serve-static-site-using-pm2
https://pm2.keymetrics.io/docs/usage/quick-start/




## Running dev.
From back-end folder run

```bash
clear && npm run buildDev && npm start
```
From front-end folder run
```bash
clear && npm start
```

## Running production.
From back-end folder run

```bash
npm run buildProd
```
it will create compiled files to dist/ folder.
Then using pm2 as process management, run if not yet installed.
Note: we do not use pm2 anymore. node-windows is better bc it creates windows service.
	Also, the back-end/node_modules folder is needed to run the windows service. Otherwise, it'll stops immediately.
	Just put the node_modules along side with /dist folder.
	Front-end don't needs the node_modules.
```bash
npm install pm2@latest -g
```
If installed already.
```bash
Jhun@POS-HI-DEMO-0 MINGW64 /c/Scheduler/back-end (main)
$ pm2 start dist/server.js --name scheduler-back-end-8080 -- --port 8080
```

To run in production mode using pm2.
To utilize pm2 according to good practice, run `$ pm2 start dist/server.js --name Scheduler-BE-8080 -- --port 8080`
Then run `$ pm2 serve build/ --spa --name Scheduler-FE-3000 --port 3000`


To run in production using node-windows instead of pm2. node-windows is better by the way.
1. `npm i node-windows -g`. Close the terminal and run as Administrator.
2. Run `npm link node-windows`.
3. Go to the root directory and copy the `service.js` to the dist/ directory.
4. From dist dir, run `node service.js`.
5. It should show the new service `CompuTant Scheduler` to the windows service.
6. It will create new directory daemon in your current dir.
7. The common error is it cannot connect to sql server. To fix, copy the .env to the dist dir.
8. Restart the new windows service. You're good to go. 


NOTE: To delete pm2 documentation. We've been using node-windows for months already.


From front-end folder run
```bash
clear && npm run build && npm start
```

## Running from browser
To run, from browser pull up `http://localhost:3000/createsession?userid=BILLY`. BILLY is the Counterpoint user so you can replace it any valid user of Counterpoint.

## To Test back-end is running
http://localhost:8080/createsession?userid=BILLY&expiryinminutes=10 will result to like
	{"status":"OK","data":{"sessionId":"EFD18534-E36A-4AE1-9797-ED8E86D01175"}}

## Running ngrok
ngrok-v3-stable-windows-amd64
`$ ngrok.exe http 80`

## Contributing

Jhun Morcilla - software engineer

Thanks to Vincent Pascua for being very supportive.

### Scripts
```
Pull up from browser: http://localhost:3000/createsession?userid=BILLY
Back-end: http://localhost:8080/createsession?userid=BILLY&expiryinminutes=10
http://localhost:3000/admin/invoice/40FD37AB-4AE1-4D2E-A7AF-2E51AF2CC8D4
```

## License

[MIT](https://choosealicense.com/licenses/mit/)