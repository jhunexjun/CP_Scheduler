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

app.use(bodyParser());  // body parse has been separated from express default installation.


// User-defined;
app.use('/public/img', express.static(path.join(__dirname, '../', '/public')))
// require('../user_modules/auth/auth')
const dbConnection = require('../user_modules/TediousConnection/sqlServerConnect')
dbConnection.getInstance();

require('../user_modules/routes')(app);
// End user-defined

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})