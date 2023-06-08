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
	const { selectedView, scheduleData } = props;

	let reduced = scheduleData.reduce((prevValue, curValue) => {
		const { startDate } = curValue;

		if (selectedView == 'Day') {
			if (moment(startDate).isSame(moment(), 'day')) {
				prevValue.push(curValue);
			}
		} else if (selectedView == 'Week') {


			return null;
		} else {
			return null;
		}

		return prevValue;
	}, []);

	const formatDateTime = (val) => moment(val).format('MM/DD/YYYY h:mm A')

	// console.log('reduced: ', reduced);

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