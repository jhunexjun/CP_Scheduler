module.exports = {
	extendSessionSql,
}

function extendSessionSql() {
	return "exec dbo.USER_extendSession @sessionId, @expiryInMinutes";
}