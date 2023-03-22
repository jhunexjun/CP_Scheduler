import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { formatDateMMddYYYY } from '../../../../utils/util';

const styles = StyleSheet.create({
	notesContainer: {
		borderWidth: 0.5,
		width: '87.3%',
		padding: 3,
	},
	notesId: {
		minWidth: 70,
	},
	text: {
		flexDirection: 'row',
		color: '#696969',
	}
});


const WorkOrderNotes = (props) => {
	const notes = props.data.table.map((item, index) =>
		<View key={ index + 1 } style={styles.text}>
			<Text style={styles.notesId}>{ formatDateMMddYYYY(item.NOTE_DAT) }</Text>
			<Text>{ item.NOTE_TXT }</Text>
		</View>
	);

	return (<>
		<View style={styles.notesContainer}>
			<Text style={{marginBottom: '3'}}>Workorder notes:</Text>
			{ notes }
		</View>
	</>);
};

export default WorkOrderNotes;