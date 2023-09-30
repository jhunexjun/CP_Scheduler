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

	let reduced = scheduleData.reduce((prevValue, curValue) => {
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

	const formatDateTime = (val) => moment(val).format('MM/DD/YYYY h:mm A');

	if (reduced === null)
		return (<></>);

	const rows = reduced.map((item, index) => {
		if (reduced.length === index + 1)
			styles.dataStyles.borderBottom = 0.5;

		let markup = <View style={styles} key={ index + 1 }>
						<Text style={[{width: 20}, styles.dataStyles, styles.text]}>{ index + 1 }</Text>
						<Text style={[{width: 110}, styles.dataStyles, styles.text]}>{ formatDateTime(item.startDate) }</Text>
						<Text style={[{width: 110}, styles.dataStyles, styles.text]}>{ formatDateTime(item.endDate) }</Text>
						<Text style={[{width: 200}, styles.dataStyles, styles.text]}>{ item.text }</Text>
						<Text style={[{width: 230}, styles.dataStyles, styles.text]}>{ item.technicianIds.toString() }</Text>
						<Text style={[{width: 72}, styles.dataStyles, styles.text]}>{ item.createdBy }</Text>
					</View>
		return markup;
	});

	return (<>{rows}</>);
}

export default SchedulesRow;