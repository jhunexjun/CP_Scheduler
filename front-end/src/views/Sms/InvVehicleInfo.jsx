import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		marginRight: 10,
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
	},
	vehicleInfo: {
		flexDirection: 'column',
	},
	label: {
		marginBottom: 5,
		fontWeight: 'ultrabold'
	}
});


const InvVehicleInfo = () => (
	<View style={[styles.vehicleInfo, styles.common]}>
		<Text style={styles.label}>Vehicle Information</Text>
		<Text>Year: 2022</Text>
		<Text>Make: TOYOTA</Text>
		<Text>Model: Camry</Text>
		<Text>Service Type: TIRE-CHNGE</Text>
		<Text>VIN No: V4545</Text>
		<Text>License: AV8521</Text>
		<Text>Exterior: Black</Text>
		<Text>Wheel lock: Glove Comp</Text>
		<Text>Appt Date: 2/11/2023</Text>
		<Text>Odometer in: 3500</Text>
		<Text>Odometer out: 3510</Text>
		<Text>Date/time in: 2/11/2023</Text>
		<Text>Date/time out: 2/11/2023</Text>
		<Text>Retain parts?: NO</Text>
		<Text>Customer own parts: NO</Text>
	</View>
);

export default InvVehicleInfo;