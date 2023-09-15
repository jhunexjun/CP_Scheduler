module.exports = {
  logoutSession
}

function logoutSession() {
  return 'update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, -1, GETUTCDATE()) where sessionId = @sessionId';
}