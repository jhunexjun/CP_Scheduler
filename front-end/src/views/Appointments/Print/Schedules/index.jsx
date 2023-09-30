import { View, Text, StyleSheet } from '@react-pdf/renderer';

import SchedulesRow from './SchedulesRow';

const styles = StyleSheet.create({
	marginTop: 17,
	flexDirection: 'column',
	tableStyle: {
		borderLeft: 0.5,
		borderTop: 0.5,
		borderRight: 0.5,
		width: '90%',
	},
	commonDataStyles: {
		padding: 5,
		borderBottom: 0.5,
	},
	headerRow: {
		flexDirection: 'row',
		fontWeight: 'bold',
	},
});

const Sched = (props) => {
	const { selectedView } = props;

	function reportName() {
		// if (selectedView == 'Day') {
		// 	return `TODAY'S SCHEDULE`;
		// } else if (selectedView == 'Week') {
		// 	return `This week's schedule`;
		// } else {

		// }

		return selectedView.toUpperCase() + ` SCHEDULE`;
	}


	return (<View style={styles}>
		<Text style={{marginBottom: 7, fontSize: 15}}>{ reportName() }</Text>
		<View style={styles.tableStyle}>
			<View style={styles.headerRow}>
				<Text style={[{width: 20}, styles.commonDataStyles]}>#</Text>
				<Text style={[{width: 110}, styles.commonDataStyles]}>FROM</Text>
				<Text style={[{width: 110}, styles.commonDataStyles]}>TO</Text>
				<Text style={[{width: 200}, styles.commonDataStyles]}>SUBJECT</Text>
				<Text style={[{width: 230}, styles.commonDataStyles]}>TECHNICIANS</Text>
				<Text style={[{width: 72}, styles.commonDataStyles]}>CREATED BY</Text>
			</View>
			<SchedulesRow {...props} />
		</View>
	</View>);
};

export default Sched;