import moment from 'moment';

function getDuration(item) {
	var now = moment(new Date());
	const duration = moment.duration(now.diff(item.utcDateTimeSent));
	const hours = duration.asHours();

	if (hours <= 0)
		return duration.asSeconds() + ' min ago';

	const days = duration.asDays();
	// if less than 24 hours and same day.
	if (days <= 0 && new Date(item.utcDateTimeSent).getDate() === new Date().getDate())
		return 'Today, ' + moment(item.utcDateTimeSent).format('h:m A');

	if (days === 1)
		return 'Yesterday, ' + moment(item.utcDateTimeSent).format('h:m A');

	// return moment(item.utcDateTimeSent).format('ddd, h:m A');
	return moment(item.utcDateTimeSent).format('MMM D, YYYY h:m A');
}

export { getDuration };