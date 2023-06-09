import { View, Text, StyleSheet } from '@react-pdf/renderer';

import moment from 'moment';

import { formatDateMMddYYYYhhmm } from '../../../../utils/util';

const styles = StyleSheet.create({
	flexDirection: 'row',
	dataStyles: {
		padding: 2,
		// border: 0.5,
		// width: 90,
		// backgroundColor: 'yellow'
		padding: 5,
	},
});

const SchedulesRow = (props) => {
	const { selectedView, scheduleData, currentSchedulerDate } = props;

	let reduced = scheduleData.reduce((prevValue, curValue) => {
		const { startDate } = curValue;

		if (selectedView == 'Day') {
			if (moment(startDate).isSame(moment(currentSchedulerDate), 'day'))
				prevValue.push(curValue);
		} else if (selectedView == 'Week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.
			const schedulerStartDate = moment(currentSchedulerDate).subtract(dayNumOfWeek, 'days');
			const schedulerEndDate = moment(currentSchedulerDate).add(6 - dayNumOfWeek, 'days');

			if (schedulerStartDate <= moment(startDate) && schedulerEndDate >= moment(startDate))
				prevValue.push(curValue);
		} else {
			const startOfMonth = moment().startOf('month');
			const endOfMonth = moment().endOf('month');

			if (startOfMonth <= moment(startDate) && endOfMonth >= moment(startDate))
				prevValue.push(curValue);
		}

		return prevValue;
	}, []);

	const formatDateTime = (val) => moment(val).format('MM/DD/YYYY h:mm A')

	if (reduced === null)
		return (<></>);

	const rows = reduced.map((item, index) => {
		if (reduced.length === index + 1)
			styles.dataStyles.borderBottom = 0.5;

		let markup = <View style={styles} key={ index + 1 }>
						<Text style={[{width: 110}, styles.dataStyles]}>{ formatDateTime(item.startDate) }</Text>
						<Text style={[{width: 110}, styles.dataStyles]}>{ formatDateTime(item.endDate) }</Text>
						<Text style={[{width: 200}, styles.dataStyles]}>{ item.text }</Text>
						<Text style={[{width: 250}, styles.dataStyles]}>{ item.technicianIds.toString() }</Text>
					</View>
		return markup;
	});

	return (<>{rows}</>);
}

export default SchedulesRow;