module.exports = {
  extendSessionSql,
}

function extendSessionSql() {
  return "exec dbo.USER_SP_extendSession @sessionId, @expiryInMinutes";
}