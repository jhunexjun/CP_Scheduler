import { View, Text, StyleSheet } from '@react-pdf/renderer';

import { formatDateMMddYYYY, formatDateMMddYYYYhhmm } from '../../../../utils/util';

const styles = StyleSheet.create({
	common: {
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
	},
	workOrderMeta: {
		flexDirection: 'column',
		color: '#696969',
	},
	workOrderLabel: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 3,
		fontWeight: 'ultrabold',
		fontSize: 9,
	},
});


const InvHeaderAddress = (props) => (
	<View style={styles.common}>
		<View style={styles.workOrderLabel}>
			<Text style={{marginBottom: 3}}>WORKORDER</Text>
			<Text>RAJ-W326</Text>
		</View>
		<View style={{flexDirection: 'column'}}>			
			<View style={styles.workOrderMeta}>
				<Text style={{marginTop: 10}}>Invoice Date: {formatDateMMddYYYY(props.data.table[0].TKT_DAT)}</Text>
				<Text>Due Date: </Text>
				<Text>Terms: </Text>
				<Text>Account: {props.data.table[0].CUST_NO}</Text>
				<Text>PO: </Text>
				<Text>Ship Method: </Text>
				<Text>Sales rep: {props.data.table[0].SLS_REP}</Text>
				<Text style={{marginBottom: 10}}>Ref: </Text>
				<Text>Date/time: {formatDateMMddYYYYhhmm(new Date())}</Text>
				{/*<Text>Page: Page 1 of 1</Text>*/}
			</View>
		</View>
	</View>
);

export default InvHeaderAddress;