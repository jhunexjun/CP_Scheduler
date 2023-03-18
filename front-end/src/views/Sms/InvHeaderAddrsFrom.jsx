import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		borderWidth: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	invoiceCompanyName: {
		fontSize: 9,
		fontStyle: 'bold',
	},
});


const InvHeaderAddress = () => (
	<View style={[{flexDirection: 'column'}, styles.common]}>
		<View>
			<Text style={styles.invoiceCompanyName}>Total Off-Road & More Raleigh</Text>
			<Text>7109 Glenwood Ave.</Text>
			<Text>Raleigh, NC 27612</Text>
			<Text>(919) 571-8105</Text>
		</View>
	</View>
);

export default InvHeaderAddress;