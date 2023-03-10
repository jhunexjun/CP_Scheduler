module.exports = {
	getLocation,
}

function getLocation() {
	return "exec dbo.USER_getLocationBySessionId @sessionId, @robot";
}