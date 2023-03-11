module.exports = {
	createSession
}

function createSession() {
	return "exec dbo.USER_SessionCreate @userId";
}