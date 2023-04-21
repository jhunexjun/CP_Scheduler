# Counterpoint Scheduler

There's no built-in scheduler with Counterpoint so this was built on top of it. This project was built using node.js express.js, MS SQL for back-end. Front-end use React.js.

## Installation

Use npm as installer for node.js. From the back-end folder, run `npm install`. Do the same in front-end folder.



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
```bash
npm install pm2@latest -g
```
If installed already.
```bash
pm2 start build/server.js
```

From front-end folder run
```bash
clear && npm run build && npm start
```

## Running from browser
To run, from browser pull up `http://localhost:3000/createsession?userid=BILLY`. BILLY is the Counterpoint user so you can replace it any valid user of Counterpoint.

## Contributing

Jhun Morcilla - software engineer

Thanks to Vincent Pascua for being very supportive.

## License

[MIT](https://choosealicense.com/licenses/mit/)