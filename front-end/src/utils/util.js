const option = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

const getRandomColor = () => 'rgba(' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ',' + Math.floor((Math.random() * 255) + 1) + ')';

function uriEncode(data) {
	var formBody = [];
	for (var property in data) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(data[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}

	formBody = formBody.join("&");
	return formBody;
}

function isSet(object, property) {
	if (object === undefined || object === null)
		return false;
	if (property === undefined || property === null)
		return false;

	if (object[property] !== undefined && object[property] !== "undefined" && object[property] !== null)
		return true;
	else
		return false;
}

function isSetScalar(param) {
	if (param === undefined || param === null || param === "")
		return false;
	else
		return true;
}

function extractSessionId(string) {
	const pattern = /appointment\/([a-z-A-Z0-9]+)/;
	const matches = pattern.exec(string);
	if (matches !== null) {
		return matches[1];
	} else {
		const pattern = /sms\/([a-z-A-Z0-9]+)/;
		const matches = pattern.exec(string);
		console.log('matches: ', matches)
		return matches[1];
	}

}


export { getRandomColor, uriEncode, isSet, isSetScalar, extractSessionId }