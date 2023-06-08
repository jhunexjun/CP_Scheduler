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
		fontSize: 8,
		fontWeight: 'bold',
	},
});

const Sched = (props) => (
	<View style={styles}>
		<Text style={{marginBottom: 7, fontSize: 15}}>TODAY'S SCHEDULE</Text>
		<View style={styles.tableStyle}>
			<View style={styles.headerRow}>
				<Text style={[{width: 110}, styles.commonDataStyles]}>From</Text>
				<Text style={[{width: 110}, styles.commonDataStyles]}>To</Text>
				<Text style={[{width: 200}, styles.commonDataStyles]}>Subject</Text>
				<Text style={[{width: 250}, styles.commonDataStyles]}>Technicians</Text>
			</View>
			<SchedulesRow {...props} />
		</View>
	</View>
);

export default Sched;