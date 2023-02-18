const option = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };


/**
 * Accepts date string.
 * For now only accepts "2022-11-04T20:42:43.267Z"
 *   or "Sat Nov 05 2022 04:42:43 GMT+0800 (Philippine Standard Time)";
 * returns the date only.
 * Abstract: if we use new Date(theDate) where theDate has timezone, it converts matic to local system date/time.
 * Solution maybe remove the "Z" or the timezone.
 * @param {string} stringDateTime. Ex. "2022-11-04T20:42:43.267Z".
 */
// function convertDateTimeToStringDate(stringDateTime) {
function extractDateOnly(stringDateTime) {
	// const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
	// 									//{ day: 'numeric', month: 'short', year: 'numeric' }
	// return new Date(dateTime).toString(undefined, options);

	let rx = /\d\d\d\d-\d\d-\d\d/g;	// e.g. "2022-11-04T20:42:43.267Z"
	let arr = rx.exec(stringDateTime);

	if (arr == null) {
		rx = /[^\s]{3}\s\d\d\s\d\d\d\d/i;	// e.g. "Sat Nov 05 2022 04:42:43 GMT+0800 (Philippine Standard Time)"
		arr = rx.exec(stringDateTime);
	}

	return arr[0];
}

function extractDateTimeOnly(stringDateTime) {
	let rx = /\d\d:\d\d:\d\d/g;	// e.g. "2022-11-04T20:42:43.267Z", "Sat Nov 05 2022 04:42:43 GMT+0800 (Philippine Standard Time)"
	let arr = rx.exec(stringDateTime);

	return extractDateOnly(stringDateTime) + " " + arr[0];
}


function convertDateTimeToLocal(dateTime) {
    var newDate = new Date(new Date(dateTime).getTime() + new Date(dateTime).getTimezoneOffset() * 60 * 1000);
    var offset = newDate.getTimezoneOffset() / 60;
    var hours = newDate.getHours();
    newDate.setHours(hours - offset);

    return newDate;
}

/**
 * Returns the locale timezone based on browser's settings. Ex. "Sat, Nov 5, 2022 6:23:57 AM"
 *
 * @param {date/time} dateTime. The date and time or date only, to be converted.
 */
function convertToLocalDateTime(dateTime) {
	return new Date(dateTime).toLocaleDateString(undefined, option) + " " + convertDateTimeToLocal(dateTime).toLocaleTimeString();
}

function toWeekMMMddYYY(dateTime) {
	return new Date(extractDateOnly(dateTime)).toLocaleDateString(undefined, option);
}

function formatAMPM(dateTime) {
	let unLocalizedDate = extractDateTimeOnly(dateTime);

	let hours = new Date(unLocalizedDate).getHours();
	let minutes = new Date(unLocalizedDate).getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+ minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

function getColumnTotal(arrayRows, columnName) {
	const sum = arrayRows.reduce((accumulator, object) => {
		return accumulator + object[columnName] || 0;
	}, 0);

	return sum;
}

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


export { extractDateOnly, extractDateTimeOnly, toWeekMMMddYYY, convertToLocalDateTime, formatAMPM, getColumnTotal, getRandomColor, uriEncode, isSet }