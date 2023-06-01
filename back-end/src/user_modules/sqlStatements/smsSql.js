module.exports = {
	insertSms, getSms, getAllSmsByCustomer, insertTwilioInbox
}

function insertSms() {
	return 'exec dbo.USER_SmsAdd @sessionId, ' +
								'@custNo, ' +
								'@recipient, ' +
								'@sms,' +
								'@messageSid,' +
								'@dateTimeSent,' +
								'@status';
}

function getSms() {
	return 'exec dbo.USER_SmsGet @sessionId';
}

function getAllSmsByCustomer() {
	return 'exec dbo.USER_SmsGetByCustomer @sessionId, @custNo';
}

// After inserting, it runs USER_ProcessTwilioSms - called inside the USER_TwilioSmsAdd.
function insertTwilioInbox() {
	return '' +
		'EXECUTE [dbo].[USER_TwilioSmsAdd] ' +
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