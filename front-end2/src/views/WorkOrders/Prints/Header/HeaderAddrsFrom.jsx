/* Note: JLM: Being used by Appointment and Work Orders. So be careful in modifying. */

import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		// borderWidth: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	workOrderCompanyName: {
		fontSize: 9,
		fontStyle: 'bold',
	},
});


const HeaderAddress = () => (
	<View style={[{flexDirection: 'column'}, styles.common]}>
		<View>
			<Text style={styles.workOrderCompanyName}>Total Off-Road & More Raleigh</Text>
			<Text>7109 Glenwood Ave.</Text>
			<Text>Raleigh, NC 27612</Text>
			<Text>(919) 571-8105</Text>
		</View>
	</View>
);

export default HeaderAddress;