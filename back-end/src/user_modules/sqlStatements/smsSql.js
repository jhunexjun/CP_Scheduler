module.exports = {
	insertSms, getSms, getAllSmsByCustomer
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