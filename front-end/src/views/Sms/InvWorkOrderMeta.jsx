import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	workOrderMeta: {
		flexDirection: 'column',
	}
});


const InvHeaderAddress = () => (
	<View style={styles.workOrderMeta}>
		<Text>WORKORDER</Text>
		<View style={{flexDirection: 'column'}}>
			<Text>RAJ-W326</Text>
			<View style={styles.workOrderMeta}>
				<Text style={{marginTop: 10}}>Invoice Date: 02/10/2023</Text>
				<Text>Due Date: </Text>
				<Text>Terms: </Text>
				<Text>Account: 3000522</Text>
				<Text>PO: </Text>
				<Text>Ship Method: </Text>
				<Text>Sales rep: CCCI</Text>
				<Text style={{marginBottom: 10}}>Ref: </Text>
				<Text>Date/time: 2/10/23 8:24pm</Text>
				<Text>Page: Page 1 of 1</Text>
			</View>
		</View>
	</View>
);

export default InvHeaderAddress;