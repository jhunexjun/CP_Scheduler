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

function isNullOrWhiteSpace(text) {
	if (text === undefined || text === null || text === '' || text.trim() === '')
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
		// console.log('matches: ', matches)
		return matches[1];
	}
}

function formatDateMMddYYYY(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (d == 'Invalid Date')
		return '';

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [month, day, year].join('/');
}

function formatDateMMddYYYYhhmm(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear(),
		hh = d.getHours(),
		mm = d.getMinutes();

	if (d == 'Invalid Date')
		return '';

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	let meridiem = '';
	if (hh < 12) {
		meridiem = ' AM';
	} else {
		hh = hh - 12;
		meridiem = ' PM';
	}

	mm = (mm.toString().length == 1) ? '0' + mm : mm;

	const dt = [month, day, year].join('/');
	const time = [hh, mm].join(':');

	return dt + ' ' + time + meridiem;
}
 

export { getRandomColor, uriEncode, isSet, isSetScalar, extractSessionId, formatDateMMddYYYY, formatDateMMddYYYYhhmm, isNullOrWhiteSpace }