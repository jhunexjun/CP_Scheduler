import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tableStyle: {
		// borderTop: 0.5,
		borderRight: 0.5,
		borderLeft: 0.5,
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

	// console.log('props: ', props.table.rows);

	const rows = props.table.rows.map((item, index) => {
		if (props.table.rows.length === index + 1)
			styles.tableStyle.borderBottom = 0.5;

		let markup = <View style={styles.tableStyle} key={ index + 1 }>
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
						<View style={{width: 50, textAlign: 'right'}}>
							<Text>{ item.hours.toFixed(2) }</Text>
						</View>
						<View style={{width: 50, textAlign: 'right'}}>
							<Text>{ item.salesQty }</Text>
						</View>
					</View>
				</View>;

		return markup;
	}

		//return x;
	);

	return (<>{rows}</>);
};

export default TableRow;