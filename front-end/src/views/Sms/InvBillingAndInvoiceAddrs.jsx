import { View, Text, StyleSheet } from '@react-pdf/renderer';


const InvBillingAndInvoiceAddrs = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={{flexDirection: 'column'}}>
			<Text>Billing address:</Text>
			<Text>Acct#: 3000522</Text>
			<Text>Jesse Hall</Text>
			<Text>5100 Swisswood Dr</Text>
			<Text>Raleigh NC 27613</Text>
			<Text>704-953-3446</Text>
			<Text>jesseshane@gmail.com</Text>
		</View>
		<View>
			<Text>Shipping address:</Text>
			<Text>Jesse Hall</Text>
			<Text>5100 Swisswood Dr</Text>
			<Text>Raleigh NC 27613</Text>
			<Text>Attn: Jesse Hall</Text>
			<Text>704-953-3446</Text>
		</View>
	</View>
);

export default InvBillingAndInvoiceAddrs;