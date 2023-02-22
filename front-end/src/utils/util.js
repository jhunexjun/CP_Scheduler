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


export { getRandomColor, uriEncode, isSet }