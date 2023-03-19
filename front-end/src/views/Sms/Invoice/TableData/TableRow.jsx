import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tableStyle: {
		// flexDirection: 'row',
		borderWidth: 0.5,
		// borderRadius: 2,
		width: '90%',
		// marginTop: 3,
		padding: 2,
	},
	tableHeaders: {
		flexDirection: 'row',
	},
});


const TableRow = (props) => {
	if (props.table.rows === null || props.table.rows.length <= 0)
		return null;

	console.log('props: ', props.table.rows);

	const rows = props.table.rows.map((item, index) =>
		<View style={styles.tableStyle} key={ index + 1 }>
			<View style={styles.tableHeaders}>
				<View style={{width: 30}}>
					<Text>{ index + 1 }</Text>
				</View>
				<View style={{width: 80}}>
					<Text>{ item.itemNo }</Text>
				</View>
				<View style={{width: 300}}>
					<Text>{ item.description }</Text>
				</View>
				<View style={{width: 50}}>
					<Text>{ item.hours }</Text>
				</View>
				<View style={{width: 40}}>
					<Text>{ item.salesQty }</Text>
				</View>
			</View>
		</View>
	);

	return (<>{rows}</>);
};

export default TableRow;