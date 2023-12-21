import path from 'path'
import express from 'express'
var bodyParser = require('body-parser')

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')


// app.use(express.static(DIST_DIR))

// app.get('*', (req, res) => {
//     res.sendFile(HTML_FILE)
// })

app.use(bodyParser());  // JLM: body parse has been separated from express default installation.


// User-defined;
app.use('/public/img', express.static(path.join(__dirname, '../', '/public')))

// const tediousConnection = require('../user_modules/dbConnections/tediousConnect')
// tediousConnection.getInstance();

const msSqlConnection = require('../user_modules/dbConnections/msSqlConnect')
msSqlConnection.getInstance();

require('../user_modules/routes')(app);
// End user-defined

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})