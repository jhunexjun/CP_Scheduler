import { View, Text, StyleSheet } from '@react-pdf/renderer';

import { formatDateMMddYYYYhhmm } from '../../../../utils/util';

const styles = StyleSheet.create({
	flexDirection: 'row',
	dataStyles: {
		padding: 10,
		border: 1,
		width: 90,
	},
});

const SchedulesRow = (props) => {
		console.log(props);

		const rows = props.scheduleData.map((item, index) => {
			let markup = <View style={styles} key={ index + 1 }>
							<Text style={styles.dataStyles}>{formatDateMMddYYYYhhmm(item.startDate)}</Text>
							<Text style={styles.dataStyles}>{formatDateMMddYYYYhhmm(item.endDate)}</Text>
						</View>
			return markup;
		});

		return (<>{rows}</>);
}

export default SchedulesRow;