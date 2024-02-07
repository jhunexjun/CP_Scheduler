const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  isSet, isNullOrWhiteSpace, formatDateMMddYYYYhhmmss, sendSms
};

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