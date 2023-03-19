import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tableStyle: {
		// flexDirection: 'row',
		borderWidth: 0.5,
		borderRadius: 2,
		width: '90%',
		marginTop: 3,
		padding: 2,
	},
	tableHeaders: {
		flexDirection: 'row',
	},
});


const TableHeader = () => (
	<View style={styles.tableStyle}>
		<View style={styles.tableHeaders}>
			<View style={{width: 30}}>
				<Text>#</Text>
			</View>
			<View style={{width: 80}}>
				<Text>ITEM NO.</Text>
			</View>
			<View style={{width: 300}}>
				<Text>DESCRIPTION</Text>
			</View>
			<View style={{width: 50}}>
				<Text>Hours</Text>
			</View>
			<View style={{width: 40}}>
				<Text>Sales Qty</Text>
			</View>
		</View>
	</View>
);

export default TableHeader;