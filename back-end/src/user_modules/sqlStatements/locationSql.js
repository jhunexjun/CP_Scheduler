module.exports = {
	getLocation,
}

function getLocation() {
	return "SELECT userId, locationId FROM USR_sessions_schedules where sessionId = @sessionId";
}