import { View, Text, StyleSheet } from '@react-pdf/renderer';

import SchedulesRow from './SchedulesRow';

const styles = StyleSheet.create({
	marginTop: 17,
	flexDirection: 'column',
	tableStyle: {

	},
	commonDataStyles: {
		padding: 10,
		border: 1,
	},
});

const Sched = (props) => (
	<View style={styles}>
		<Text style={{marginBottom: 7, fontSize: 15}}>TODAY'S SCHEDULE</Text>
		<View style={styles.tableStyle}>
			<View style={{flexDirection: 'row'}}>
				<Text style={[{width: 90}, styles.commonDataStyles]}>From</Text>
				<Text style={[{width: 90}, styles.commonDataStyles]}>To</Text>
				<Text style={styles.commonDataStyles}>Subject</Text>
				<Text style={styles.commonDataStyles}>Technicians</Text>
			</View>
			<SchedulesRow {...props} />
		</View>
	</View>
);

export default Sched;