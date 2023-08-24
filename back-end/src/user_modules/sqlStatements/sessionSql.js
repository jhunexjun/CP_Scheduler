module.exports = {
	createSession
}

function createSession() {
	return "exec dbo.USER_SP_SessionCreate @userId, @expiryInMinutes";
}