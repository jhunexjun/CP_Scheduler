import { View, Text, StyleSheet, Image, } from '@react-pdf/renderer';

import { formatDateMMddYYYY, formatDateMMddYYYYhhmm } from '../../../../utils/util';

const styles = StyleSheet.create({
	common: {
		borderWidth: 0.5,
		padding: 5,
		borderRadius: 3,
		height: 140,
	},
	workOrderMeta: {
		flexDirection: 'column',
		color: '#696969',
	},
	tktNoLabelContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 3,
		fontWeight: 'ultrabold',
		fontSize: 9,
	},
	woLabelContainer: {borderWidth: 0, flexDirection: 'row', justifyContent: 'center', marginBottom: 3, backgroundColor: 'black'}
});


const InvHeaderAddress = (props) => {
	return (
		<View>
			<View style={styles.woLabelContainer}>
				<Text style={{padding: 1, color: 'white', fontSize: 10}}>WORKORDER</Text>
			</View>
			<View style={styles.common}>
				<View style={styles.tktNoLabelContainer}>
					<Text>{props.data.table[0].TKT_NO}</Text>
				</View>
				<Image src={() => props.data.barcode.base64} style={{width:'100px', height: '20px'}} />
				<View style={{flexDirection: 'column'}}>
					<View style={styles.workOrderMeta}>
						<Text style={{marginTop: 10}}>Invoice Date: {formatDateMMddYYYY(props.data.table[0].TKT_DAT)}</Text>
						<Text>Due Date: {props.data.table[0].SHIP_DAT}</Text>
						<Text>Terms: {props.data.table[0].TERMS_COD}</Text>
						<Text>Account: {props.data.table[0].CUST_NO}</Text>
						<Text>PO: {props.data.table[0].CUST_PO_NO}</Text>
						<Text>Ship Method: {props.data.table[0].SHIP_VIA_COD}</Text>
						<Text>Sales rep: {props.data.table[0].SLS_REP}</Text>
						<Text style={{marginBottom: 10}}>Ref: </Text>
						<Text>Date/time: {formatDateMMddYYYYhhmm(new Date())}</Text>
						<Text render={({ pageNumber, totalPages }) => (
							`Page ${pageNumber} of ${totalPages}`
						)} fixed />
					</View>
				</View>
			</View>
		</View>
	);
};

export default InvHeaderAddress;