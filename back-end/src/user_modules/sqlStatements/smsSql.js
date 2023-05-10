module.exports = {
	insertSms, getSms, getAllSmsByCustomer, insertTwilioInbox
}

function insertSms() {
	return 'exec dbo.USER_SmsAdd @sessionId, ' +
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