module.exports = {
	insertSms, getSms
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