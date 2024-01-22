import {
	Document,
	Page,
	StyleSheet,
} from "@react-pdf/renderer";

import HeaderIndex from './Header/HeaderIndex';
import Schedules from './Appointments';

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
				<HeaderIndex {...props} />
				<Schedules {...props} />
			</Page>
		</Document>
	);
}

export default scheduleDocumentContainer;