import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	headerRightContainer: { backgroundColor: '#F9F2E2', width: 150, },
	headerLeftPortion: { fontSize: 32, width: 375, fontStyle: 'oblique', /*backgroundColor: 'yellow'*/ },
	headerDate: { marginTop: 10, marginLeft: 10 }
});

const SchedulePrintIndex = () => (
	<View style={{flexDirection: 'row'}}>
		<Text style={styles.headerLeftPortion}>DAILY PLAN</Text>
		<View style={styles.headerRightContainer}>
			<Text style={styles.headerDate}>DATE</Text>
		</View>
	</View>
);

export default SchedulePrintIndex;