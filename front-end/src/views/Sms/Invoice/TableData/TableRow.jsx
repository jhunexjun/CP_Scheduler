import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tableStyle: {
		borderRight: 0.5,
		borderLeft: 0.5,
		width: '90%',
		padding: 2,
	},
	tableHeaders: {
		flexDirection: 'row',
	},
	text: { color: '#696969', }
});


const TableRow = (props) => {
	if (props.table.rows === null || props.table.rows.length <= 0)
		return null;

	const rows = props.table.rows.map((item, index) => {
		if (props.table.rows.length === index + 1)
			styles.tableStyle.borderBottom = 0.5;

		let markup = <View style={styles.tableStyle} key={ index + 1 }>
					<View style={styles.tableHeaders}>
						<Text style={[{width: 30}, styles.text]}>{ index + 1 }</Text>
						<Text style={[{width: 80}, styles.text]}>{ item.itemNo }</Text>
						<Text style={[{width: 300}, styles.text]}>{ item.description }</Text>
						<Text style={[{width: 50, textAlign: 'right'}, styles.text]}>{ item.hours.toFixed(2) }</Text>
						<Text style={[{width: 50, textAlign: 'right'}, styles.text]}>{ item.salesQty }</Text>
					</View>
				</View>;

		return markup;
	});

	return (<>{rows}</>);
};

export default TableRow;