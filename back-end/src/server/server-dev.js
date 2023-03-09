// JLM: this boilerplate is from https://binyamin.medium.com/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334

import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import createError from 'http-errors'
import compression from 'compression'
var bodyParser = require('body-parser')

const app = express(),
      DIST_DIR = __dirname,
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      compiler = webpack(config)

app.use(bodyParser());  // body parse has been separated from express default installation.


// User-defined;
app.use('/public/img', express.static(path.join(__dirname, '../', '/public')))

const tediousConnection = require('../user_modules/dbConnections/tediousConnect')
tediousConnection.getInstance();

const msSqlConnection = require('../user_modules/dbConnections/msSqlConnect')
msSqlConnection.getInstance();

require('../user_modules/routes')(app);
// End user-defined



app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

// app.get('*', (req, res, next) => {
//   compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//   if (err) {
//     return next(err)
//   }
//   res.set('content-type', 'text/html')
//   res.send(result)
//   res.end()
//   })
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// if debugging, you can disable this to see the stack trace.
// app.use(function(err, req, res, next) {
//   //console.log(err); // still have to work why invalid username/password not showing.
//   res.status(500);
//   res.json({ error: "Something went wrong!"});
// });

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
