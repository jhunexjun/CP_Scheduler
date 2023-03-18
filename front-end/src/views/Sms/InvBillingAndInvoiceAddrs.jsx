import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		flexDirection: 'row',
	},
	billingAddrss: {
		flexDirection: 'column',
		width: 150,
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
		// marginRight: 3,
	},
	billAddrssLabel: {
		marginBottom: 5,
		fontStyle: 'bold'
	}
});


const InvBillingAndInvoiceAddrs = () => (
	<View style={styles.common}>
		<View style={[styles.billingAddrss, {marginRight: 3}]}>
			<View>
				<Text style={styles.billAddrssLabel}>Billing address:</Text>
				<Text>Acct#: 3000522</Text>
				<Text>Jesse Hall</Text>
				<Text>5100 Swisswood Dr</Text>
				<Text>Raleigh NC 27613</Text>
				<Text>704-953-3446</Text>
				<Text>jesseshane@gmail.com</Text>
			</View>
		</View>
		<View style={styles.billingAddrss}>
			<View>
				<Text style={styles.billAddrssLabel}>Shipping address:</Text>
				<Text>Jesse Hall</Text>
				<Text>5100 Swisswood Dr</Text>
				<Text>Raleigh NC 27613</Text>
				<Text>Attn: Jesse Hall</Text>
				<Text>704-953-3446</Text>
			</View>
		</View>
	</View>
);

export default InvBillingAndInvoiceAddrs;