import { View, Text, StyleSheet } from '@react-pdf/renderer';

import moment from 'moment';

const styles = StyleSheet.create({
	flexDirection: 'row',
	dataStyles: {
		padding: 5,
	},
	text: { color: '#696969', }
});

const SchedulesRow = (props) => {
	const { selectedView, scheduleData, currentSchedulerDate } = props;

	let reduced = scheduleData?.reduce((prevValue, curValue) => {
		const { startDate } = curValue;

		let sDate, eDate;	// date ranges.

		if (selectedView === 'Day') {
			if (moment(startDate).isSame(moment(currentSchedulerDate), 'day'))
				prevValue.push(curValue);
		} else if (selectedView === 'Week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.
			sDate = moment(currentSchedulerDate).subtract(dayNumOfWeek, 'days');
			// sDate = moment(sDate.format('YYYY-MM-DD'));	// remove the time.

			// eDate = moment(currentSchedulerDate).add((6 - dayNumOfWeek) + dayNumOfWeek, 'days');
			eDate = moment(currentSchedulerDate).add((6 - dayNumOfWeek), 'days');
			// eDate = moment(eDate.format('YYYY-MM-DD'));	// remove the time.

			if (sDate.isSameOrBefore(startDate, 'days') && eDate.isSameOrAfter(startDate, 'days'))
				prevValue.push(curValue);
		} else {
			sDate = moment(currentSchedulerDate).startOf('month');
			eDate = moment(currentSchedulerDate).endOf('month');

			if (sDate <= moment(startDate) && eDate >= moment(startDate))
				prevValue.push(curValue);
		}

		return prevValue;
	}, []);

	const formatDateOnly = (val) => moment(val).format('MM/DD/YYYY');
	const formatTimeOnly = (val) => moment(val).format('h:mmA');

	const hrsWorked = (date2, date1) => {
		const diff = new Date(date2) - new Date(date1);
		const mm = Math.floor(diff / 1000 / 60) % 60;
		const hh = Math.floor(diff / 1000 / 60 / 60);
		return `${hh}:${mm}`;
	}

	if (reduced === null)
		return (<></>);

	const rows = reduced?.map((item, index) => {
		if (reduced.length === index + 1)
			styles.dataStyles.borderBottom = 0.5;

		let markup = <View style={styles} key={ index + 1 }>
						<Text style={[{width: 17}, styles.dataStyles, styles.text]}>{ index + 1 }</Text>
						<Text style={[{width: 55}, styles.dataStyles, styles.text]}>{ formatDateOnly(item.startDate) }</Text>
						<Text style={[{width: 45}, styles.dataStyles, styles.text]}>{ formatTimeOnly(item.startDate) }</Text>
						<Text style={[{width: 50}, styles.dataStyles, styles.text]}>{ formatTimeOnly(item.endDate) }</Text>
						<Text style={[{width: 35}, styles.dataStyles, styles.text]}>{ hrsWorked(item.endDate, item.startDate) }</Text>
						<Text style={[{width: 200}, styles.dataStyles, styles.text]}>{ item.text }</Text>
						<Text style={[{width: 180}, styles.dataStyles, styles.text]}>{ item.technicianIds.toString() }</Text>
						<Text style={[{width: 72}, styles.dataStyles, styles.text]}>{ item.createdBy }</Text>
					</View>
		return markup;
	});

	return (<>{rows}</>);
}

export default SchedulesRow;