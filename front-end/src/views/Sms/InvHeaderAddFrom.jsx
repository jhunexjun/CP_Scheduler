import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	invoiceCompanyName: {
		fontSize: 9,
		fontStyle: 'bold',
	},
	address: {
		fontSize: 8,
	}
});


const InvHeaderAddress = () => (
	<View>
		<Text style={styles.invoiceCompanyName}>Total Off-Road & More Raleigh</Text>
		<Text style={styles.address}>7109 Glenwood Ave.</Text>
		<Text style={styles.address}>Raleigh, NC 27612</Text>
		<Text style={styles.address}>(919) 571-8105</Text>
	</View>
);

export default InvHeaderAddress;