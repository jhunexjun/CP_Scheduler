import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		marginRight: 5,
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
	},
	vehicleInfo: {
		flexDirection: 'column',
		width: 120,
	},
	label: {
		marginBottom: 5,
		fontWeight: 'ultrabold'
	},
	text: { color: '#696969', },
});


const InvVehicleInfo = (props) => (
	<View style={[styles.vehicleInfo, styles.common]}>
		<Text style={styles.label}>Vehicle Information:</Text>
		<View style={styles.text}>
			<Text>Year: {props.data.table[0].USR_YR}</Text>
			<Text>Make: {props.data.table[0].USR_MAKE}</Text>
			<Text>Model: {props.data.table[0].USR_MODEL}</Text>
			<Text>Service Type: {props.data.table[0].USR_SERVICE_TYP}</Text>
			<Text>VIN No: {props.data.table[0].USR_VIN_NO}</Text>
			<Text>License: {props.data.table[0].USR_LIC_PLATE}</Text>
			<Text>Exterior: {props.data.table[0].USR_EXTERRIOR}</Text>
			<Text>Wheel lock: {props.data.table[0].USR_WHEEL_LOCK}</Text>
			<Text>Appt Date: {props.data.table[0].USR_APPT_DAT}</Text>
			<Text>Odometer in: {props.data.table[0].USR_ODOMETER_IN}</Text>
			<Text>Odometer out: {props.data.table[0].USR_ODOMETER_OUT}</Text>
			<Text>Date/time in: {props.data.table[0].USR_SERVICE_IN_DAT} {props.data.table[0].USR_SERVICE_IN_TIM}</Text>
			<Text>Date/time out: {props.data.table[0].USR_SERVICE_OUT_DAT} {props.data.table[0].USR_SERVICE_OUT_TIM}</Text>
			<Text>Retain parts?: {props.data.table[0].USR_RETAIN_PARTS}</Text>
			<Text>Customer own parts: {props.data.table[0].USR_CUSTOMER_OWN_PARTS}</Text>
		</View>
	</View>
);

export default InvVehicleInfo;