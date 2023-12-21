// const dbConnection = require('../dbConnections/tediousConnect');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  /*executeRequestAsync, executeOutputParams,*/ isSet, isNullOrWhiteSpace, formatDateMMddYYYYhhmmss, sendSms
};

// async function executeRequestAsync(request) {
//   return new Promise(async (resolve, reject) => {
//     let  result = [];

//     request.on('row', (columns) => {
//       let entry = {};
//       columns.forEach((column) => {
//         entry[column.metadata.colName] = column.value;
//       })

//       result.push(entry);
//     });

//     request.on('error', (error) => reject(error));

//     request.on('requestCompleted', () => resolve(result));

//     let dbCon = await dbConnection.getInstance();

//     dbCon.execSql(request);
//   });
// }

// function executeOutputParams(dbConnection, request){
//   return new Promise((resolve, reject) => {
//     let  result = [];
//     let entry = {};

//     request.on('returnValue', (paramName, value, metadata) => {
//       console.log(paramName + '=', value);
//       entry[paramName] = value;
//     });
//     result.push(entry);

//     request.on('error', (error) => reject(error));

//     request.on('requestCompleted', () => resolve(result));

//     dbConnection.execSql(request)
//   });
// }

function isSet(object, property) {
  if (object === undefined || object === null)
    return false;
  if (property === undefined || property === null)
    return false;

  if (object[property] !== undefined && object[property] !== "undefined" && object[property] !== null)
    return true;
  else
    return false;
}

function isNullOrWhiteSpace(text) {
  if (text === undefined || text === null || text === '' || text.trim() === '')
    return true;
  else
    return false;
}

function formatDateMMddYYYYhhmmss(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hh = d.getHours(),
    mm = d.getMinutes();
    ss = d.getSeconds();

  if (d == 'Invalid Date')
    return '';

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  let meridiem = '';
  if (hh < 12) {
    meridiem = ' AM';
  } else {
    hh = hh - 12;
    meridiem = ' PM';
  }

  mm = (mm.toString().length === 1) ? '0' + mm : mm;

  const dt = [month, day, year].join('/');
  const time = [hh, mm, ss].join(':');

  return dt + ' ' + time + meridiem;
}

/* Twilio send SMS.
 *
 */
async function sendSms(recipient, smsMessage) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  return client.messages.create({
                body: smsMessage,
                from: `${process.env.TWILIO_MOBILENO}`,
                to: `${recipient}`
                // to: `+63${recipient}`
                // to: `+639065165124`
                // to: `+639608581818`
              }).then(message => message.sid);
}