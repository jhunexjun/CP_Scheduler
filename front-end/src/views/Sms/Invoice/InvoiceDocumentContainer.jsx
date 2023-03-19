import {
	Document,
	Page,
	StyleSheet,
} from "@react-pdf/renderer";

import HeadersContent from './Header/HeadersContent';
import TableIndex from './TableData/TableIndex';
import WorkOrderNotes from './WorkOrderNotes/WorkOrderNotes';


const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		margin: 25,
		fontSize: 7,
		lineHeight: 1.2,
	}
});


const invoiceDocumentContainer = (props) => {


	return (
		<Document>
			<Page size='LETTER' style={styles.page}>
				<HeadersContent />
				<TableIndex {...props} />
				<WorkOrderNotes {...props} />
			</Page>
		</Document>
	);
}

export default invoiceDocumentContainer