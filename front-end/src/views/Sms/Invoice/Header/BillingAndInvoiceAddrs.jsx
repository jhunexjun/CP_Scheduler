import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	common: {
		flexDirection: 'row',
		height: 83,
	},
	billingAddrss: {
		flexDirection: 'column',
		width: 150,
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
	},
	billAddrssLabel: {
		marginBottom: 5,
		fontStyle: 'bold'
	},
	text: { color: '#696969', },
});


const InvBillingAndInvoiceAddrs = (props) => {
	return (
		<View style={styles.common}>
			<View style={[styles.billingAddrss, {marginRight: 3}]}>
				<Text style={styles.billAddrssLabel}>Billing address:</Text>
				<View style={styles.text}>
					<Text>Acct#: {props.data.table[0].CUST_NO}</Text>
					<Text>{props.data.table[0].BILL_NAM}</Text>
					<Text>{props.data.table[0].billAddress}</Text>
					<Text>{props.data.table[0].BILL_CITY} {props.data.table[0].BILL_STATE} {props.data.table[0].BILL_ZIP_COD}</Text>
					<Text>{props.data.table[0].BILL_PHONE_1}</Text>
					<Text>{props.data.table[0].BILL_EMAIL_ADRS_1}</Text>
				</View>
			</View>
			<View style={styles.billingAddrss}>
				<Text style={styles.billAddrssLabel}>Shipping address:</Text>
				<View style={styles.text}>
					<Text>{props.data.table[0].SHIP_NAM}</Text>
					<Text>{props.data.table[0].shipAddress}</Text>
					<Text>{props.data.table[0].SHIP_CITY} {props.data.table[0].SHIP_STATE} {props.data.table[0].SHIP_ZIP_COD}</Text>
					<Text>Attn: {props.data.table[0].SHIP_NAM}</Text>
					<Text>{props.data.table[0].SHIP_PHONE_1}</Text>
				</View>
			</View>
		</View>);
};

export default InvBillingAndInvoiceAddrs;