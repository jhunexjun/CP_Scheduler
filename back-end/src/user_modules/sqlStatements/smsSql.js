module.exports = {
  insertSms, getSms, getAllSmsByCustomer, insertTwilioInbox
}

function insertSms() {
  return 'exec dbo.USER_SP_SmsAdd @sessionId, ' +
            '@custNo, ' +
            '@recipient, ' +
            '@sms,' +
            '@messageSid,' +
            '@dateTimeSent,' +
            '@status,' +
            '@checkSessionId';
}

function getSms() {
  return 'exec dbo.USER_SP_SmsGet @sessionId';
}

function getAllSmsByCustomer() {
  return 'exec dbo.USER_SP_SmsGetByCustomer @sessionId, @custNo';
}

// After inserting, it runs USER_SP_ProcessTwilioSms - called inside the USER_SP_TwilioSmsAdd.
function insertTwilioInbox() {
  return '' +
    'EXECUTE [dbo].[USER_SP_TwilioSmsAdd] ' +
      '@toCountry ' +
      ',@toState ' +
      ',@smsMessageSid ' +
      ',@numMedia ' +
      ',@toCity ' +
      ',@fromZip ' +
      ',@smsSid ' +
      ',@fromState ' +
      ',@smsStatus ' +
      ',@fromCity ' +
      ',@body ' +
      ',@fromCountry ' +
      ',@to ' +
      ',@toZip ' +
      ',@numSegments ' +
      ',@accountSid ' +
      ',@from ' +
      ',@apiVersion';
}