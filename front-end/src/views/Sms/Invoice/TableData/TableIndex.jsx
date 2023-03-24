import { View, Text, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const styles = StyleSheet.create({
	tableStyle: {
		flexDirection: 'column',
		borderRadius: 2,
		width: '98.5%',
		marginTop: 3,
		marginBottom: 3,
	},
	tableHeaders: {
		flexDirection: 'row',
	},
});


const TableIndex = (props) => (
	<View style={styles.tableStyle}>
		<TableHeader />
		<TableRow {...props} />
	</View>
);

export default TableIndex;