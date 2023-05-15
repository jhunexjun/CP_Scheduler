import moment from 'moment';

function getDuration(item) {
	var now = moment(new Date());
	const duration = moment.duration(now.diff(item.utcDdateAndTime));
	const minutes = duration.asMinutes();
	const seconds = duration.asSeconds();

	if (seconds <= 0)
		return 'Just now';

	if (minutes < 1)
		return `${parseInt(seconds)} sec ago`;

	const hours = duration.asHours();
	if (hours <= 1 && minutes >= 1)
		return `${parseInt(minutes)} min ago`;

	const days = duration.asDays();

	// if less than 24 hours and same day.
	if (days >= 0 && new Date(item.utcDdateAndTime).getDate() === new Date().getDate())
		return 'Today, ' + moment(item.utcDdateAndTime).format('h:mm A');

	if (days === 1)
		return 'Yesterday, ' + moment(item.utcDdateAndTime).format('h:mm A');

	// return moment(item.utcDdateAndTime).format('ddd, h:m A');
	return moment(item.utcDdateAndTime).format('MMM D, YYYY h:m A');
}

export { getDuration };