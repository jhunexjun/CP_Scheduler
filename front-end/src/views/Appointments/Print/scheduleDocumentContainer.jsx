import {
	Document,
	Page,
	StyleSheet,
	View,
	Text
} from "@react-pdf/renderer";

import HeaderIndex from './Header/HeaderIndex';
import Schedules from './Schedules';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		margin: 25,
		fontSize: 7,
		lineHeight: 1.2,
	},
});


const scheduleDocumentContainer = (props) => {
	return (
		<Document>
			<Page size='LETTER' style={styles.page}>
				<HeaderIndex />
				<Schedules {...props} />
			</Page>
		</Document>
	);
}

export default scheduleDocumentContainer;